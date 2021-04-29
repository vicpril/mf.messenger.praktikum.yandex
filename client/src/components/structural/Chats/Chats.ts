import "./Chats.scss";

import { strContains } from "../../../utils/pure-functions";
import template from "./Chats.tmpl";
import { LeftSidebarViews } from "../../../controllers/LeftSidebar/LeftSidebarViews";
import { UserRemote } from "../UserRemote/UserRemote";
import { User, UserFields } from "../../../models/User";
import { LeftSidebarController } from "../../../controllers/LeftSidebar/LeftSidebarController";
import {
   HideLeftSidebarLoader,
   LeftSidebarLoaderInit,
   ShowLeftSidebarLoader,
} from "../../../controllers/LeftSidebar/LeftSidebarLoader/LeftSidebarLoader";
import { UsersController } from "../../../controllers/Users/UsersController";
import { ChatsController } from "../../../controllers/Chats/ChatsController";
import { TChat } from "../../../models/Chat";
import { Chat } from "../Chat/Chat";
import { Component } from "../../../core/Component";

export const Chats = {
   name: "Chats",
   template: template,
   templatorReverse: true,
   components: [Chat, UserRemote],
   props: {
      view: LeftSidebarViews.Chats,
      chats: [],
      chatsFiltered: [],
      usersRemote: [],
      remotePlaceholder: getPlaceholder(),
   },
   listeners: ["click"],
   methods: {
      onClick: function (e: Event & { target: HTMLButtonElement }) {
         if (e.target.dataset.action === "newChat") {
            this.$emit("ShowNewChatModal");
         }
      },
   },
   subscribers: {
      "ChatFilter:input": function (s: string) {
         this.props.chatsFiltered = getChatsFiltered.call(this, s);
         this.$emit(this.EVENTS.UPDATE);
      },
      "ChatSearch:input": async function (s: string) {
         if (s.length >= 3) {
            const users = await getRemoteUsers(s);
            console.log("~ users", users);
            this.props.usersRemote = users;
            this.props.remotePlaceholder = getPlaceholder(s);
            this.$emit(this.EVENTS.UPDATE);
         } else {
            resetRemote.call(this);
         }
         this.$emit(this.EVENTS.UPDATE);
      },
      toggleLeftSidebarView: function (view: LeftSidebarViews) {
         if (this.props.view !== view) {
            resetRemote.call(this);
            this.props.view = view;
            this.$emit(this.EVENTS.UPDATE);
         }
      },
      "App:destroy": () => {
         HideLeftSidebarLoader();
      },
      "Chat:selected": function (id: number) {
         this.componentsInst.forEach((chat: Component) => {
            if (chat.props.chat.id === id) {
               chat.methods.setActive.call(chat);
            } else {
               chat.methods.setInactive.call(chat);
            }
         });
      },
   },
   async beforePrepare() {
      LeftSidebarLoaderInit();
      this.props.view = LeftSidebarController.getSidebarView();
      ShowLeftSidebarLoader()();
      new ChatsController(this)
         .getChats()
         .then((chats) => {
            this.props.chats = chats;
            this.props.chatsFiltered = this.props.chats;
            this.$emit(this.EVENTS.UPDATE);
         })
         .finally(HideLeftSidebarLoader);

      this.props.usersRemote = [];
   },
};

function getChatsFiltered(s: string): TChat[] {
   return this.props.chats.filter((chat: TChat) =>
      strContains(s, chat.title, false)
   );
}

async function getRemoteUsers(search: string) {
   const users = await UsersController.search(search);
   return users.map((data: UserFields) => new User(data));
}

function getPlaceholder(s: string = "") {
   if (s.length >= 3) {
      return `No users found with login "${s}"`;
   }
   return "For searching type 3 or more symbols";
}

function resetRemote() {
   this.props.usersRemote = [];
   this.props.remotePlaceholder = getPlaceholder();
   HideLeftSidebarLoader();
}
