import "./Chats.scss";

import { Chat } from "../Chat/Chat";
import { TChat } from "../../../models/types";
import { strContains } from "../../../utils/pure-functions";
import template from "./Chats.tmpl";
import { LeftSidebarViews } from "../../../controllers/LeftSidebar/LeftSidebarViews";
import { UserRemote } from "../UserRemote/UserRemote";
import { User } from "../../../models/User";
import { AppService } from "../../../services/AppService";
import { LeftSidebarController } from "../../../controllers/LeftSidebar/LeftSidebarController";
import {
   HideLeftSidebarLoader,
   LeftSidebarLoaderInit,
   ShowLeftSidebarLoader,
} from "../../../controllers/LeftSidebar/LeftSidebarLoader/LeftSidebarLoader";

export const Chats = {
   name: "Chats",
   template: template,
   components: [Chat, UserRemote],
   props: {
      view: LeftSidebarViews.Chats,
      chats: [],
      chatsFiltered: [],
      usersRemote: [],
   },
   listeners: [],
   methods: {},
   subscribers: {
      "ChatFilter:input": function (s: string) {
         this.props.chatsFiltered = getChatsFiltered.call(this, s);
         this.$emit(this.EVENTS.UPDATE);
      },
      "ChatSearch:input": function (s: string) {
         if (s.length >= 3) {
            ShowLeftSidebarLoader()();
         } else {
            HideLeftSidebarLoader();
         }
         this.$emit(this.EVENTS.UPDATE);
      },
      toggleLeftSidebarView: function (view: LeftSidebarViews) {
         HideLeftSidebarLoader();
         if (this.props.view !== view) {
            this.props.view = view;
            this.$emit(this.EVENTS.UPDATE);
         }
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

function getRemoteUsers(): User[] {
   return this.props.chats.map((c: TChat) => {
      const u = c.user;
      return new User(u);
   });
}
