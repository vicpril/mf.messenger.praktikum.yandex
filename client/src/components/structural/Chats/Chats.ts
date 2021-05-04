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
import * as actions from "../../../core/store/actions";
import { Store } from "../../../core/store/Store";

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
            try {
               const users = await getRemoteUsers(s);
               this.props.usersRemote = users;
               this.props.remotePlaceholder = getPlaceholder(s);
               this.$emit(this.EVENTS.UPDATE);
            } catch (error) {
               throw new Error(error);
            }
         } else {
            resetRemote.call(this);
         }
         this.$emit(this.EVENTS.UPDATE);
      },
      toggleLeftSidebarView: async function (view: LeftSidebarViews) {
         if (view === LeftSidebarViews.ChatsSearch) {
            try {
               this.props.chatUsers = await fetchUsers.call(this);
            } catch (error) {
               throw new Error(error);
            }
         }
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
      "Chat:updated": function () {
         fetchChats.call(this, {});
      },
      "Chat:userDeleted": function () {
         if (this.props.view === LeftSidebarViews.ChatsSearch) {
            resetRemote.call(this);
            this.$emit(this.EVENTS.UPDATE);
         }
      },
   },
   storeSubscribers: {},

   async beforePrepare() {
      LeftSidebarLoaderInit();
      this.props.view = LeftSidebarController.getSidebarView();
      try {
         await fetchChats.call(this, {});
      } catch (error) {
         throw new Error(error);
      }
      this.props.usersRemote = [];
   },

   afterInit() {
      const interval = Store.get().getState().checkNewMessageInterval;
      if (!this.props.newMessagesChecker && interval && interval > 0) {
         this.props.newMessagesChecker = setInterval(() => {
            fetchChats.call(this, {
               shouldUpdate: false,
               shouldShowLoader: true,
            });
         }, interval);
      }
   },

   beforeDestroy() {
      clearInterval(this.props.newMessagesChecker);
      this.props.newMessagesChecker = null;
   },
};

function getChatsFiltered(s: string): TChat[] {
   return this.props.chats.filter((chat: TChat) =>
      strContains(s, chat.title, false)
   );
}

async function getRemoteUsers(search: string) {
   try {
      const users = await UsersController.search(search);
      return users.map((data: UserFields) => new User(data));
   } catch (error) {
      throw new Error(error);
   }
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

type FetchChatsParams = {
   shouldUpdate?: boolean;
   shouldShowLoader?: boolean;
};
function fetchChats({
   shouldUpdate = true,
   shouldShowLoader = false,
}: FetchChatsParams) {
   if (!shouldShowLoader) ShowLeftSidebarLoader()();
   new ChatsController(this)
      .getChats(shouldShowLoader)
      .then((chats) => {
         this.props.chats = chats;
         this.props.chatsFiltered = this.props.chats;
         if (ChatsController.getSelectedChat() === null) {
            this.$dispatch(actions.selectChat(null));
            this.$emit("Chat:selected");
         }
         if (shouldUpdate) {
            this.$emit(this.EVENTS.UPDATE);
         }
      })
      .finally(() => {
         if (!shouldShowLoader) HideLeftSidebarLoader();
      });
}

function fetchUsers() {
   const chat = ChatsController.getSelectedChatId();
   return new ChatsController(this).getChatUsers(chat);
}
