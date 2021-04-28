import "./Chats.scss";

import { Chat } from "../Chat/Chat";
import { TChat } from "../../../models/types";
import { strContains } from "../../../utils/pure-functions";
import template from "./Chats.tmpl";
import { LeftSidebarViews } from "../../../controllers/LeftSidebar/LeftSidebarViews";
import { UserRemote } from "../UserRemote/UserRemote";
import { User, UserFields } from "../../../models/User";
import { AppService } from "../../../services/AppService";
import { LeftSidebarController } from "../../../controllers/LeftSidebar/LeftSidebarController";
import {
   HideLeftSidebarLoader,
   LeftSidebarLoaderInit,
} from "../../../controllers/LeftSidebar/LeftSidebarLoader/LeftSidebarLoader";
import { UsersController } from "../../../controllers/Users/UsersController";

export const Chats = {
   name: "Chats",
   template: template,
   components: [Chat, UserRemote],
   props: {
      view: LeftSidebarViews.Chats,
      chats: [],
      chatsFiltered: [],
      usersRemote: [],
      remotePlaceholder: getPlaceholder(),
   },
   listeners: [],
   methods: {},
   subscribers: {
      "ChatFilter:input": function (s: string) {
         this.props.chatsFiltered = getChatsFiltered.call(this, s);
         this.$emit(this.EVENTS.UPDATE);
      },
      "ChatSearch:input": async function (s: string) {
         if (s.length >= 3) {
            const users = await getRemoteUsers(s);
            this.props.usersRemote = users;
            this.props.remotePlaceholder = getPlaceholder(s);
            this.$emit(this.EVENTS.UPDATE);
         } else {
            resetRemote.call(this);
         }
         this.$emit(this.EVENTS.UPDATE);
      },
      toggleLeftSidebarView: function (view: LeftSidebarViews) {
         resetRemote.call(this);
         if (this.props.view !== view) {
            this.props.view = view;
            this.$emit(this.EVENTS.UPDATE);
         }
      },
      "App:destroy": () => {
         HideLeftSidebarLoader();
      },
   },
   beforePrepare() {
      this.props.view = LeftSidebarController.getSidebarView();
      this.props.chats = AppService.getChats();
      this.props.chatsFiltered = this.props.chats;
      // this.props.usersRemote = getRemoteUsers.call(this);
      this.props.usersRemote = [];
   },
   afterInit() {
      LeftSidebarLoaderInit();
   },
};

function getChatsFiltered(s: string): TChat[] {
   return this.props.chats.filter((chat: TChat) =>
      strContains(s, chat.user.display_name, false)
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
