import "./InfoChat.scss";

import { Avatar } from "../Avatar/Avatar";
import template from "./InfoChat.tmpl";
import { RightSidebarController } from "../../../controllers/RightSidebar/RightSidebarController";
import { ChatsController } from "../../../controllers/Chats/ChatsController";
import {
   HideChatInfoLoader,
   LoaderIncfoChatTemplate as loader,
} from "./InfoChatLoader";
import "../../../core/loader/loader.scss";
import { TUser } from "../../../models/User";
import { User } from "../User/User";

export const InfoChat = {
   name: "InfoChat",
   template: template,
   components: [Avatar, User],
   props: {
      chat: {},
      users: [],
      loader: loader,
   },
   listeners: ["click"],
   subscribers: {
      "Chat:userAdded": function () {
         refreshUsers.call(this);
      },
   },
   methods: {
      onClick(e: Event & { target: HTMLElement }) {
         if (e.target.dataset.action === "changeAvatar") {
            console.log(
               `Notifications from ${this.props.user.display_name} muted!`
            );
         }
         if (e.target.dataset.action === "delete") {
            if (
               // eslint-disable-next-line no-restricted-globals
               confirm(
                  `Are you sure you want to delete the chat "${this.props.chat.title}?"`
               )
            ) {
               new ChatsController(this).delete(this.props.chat.id);
            }
         }
      },
   },
   async beforePrepare() {
      refreshUsers.call(this);
   },
};

function refreshUsers() {
   this.props.chat = RightSidebarController.getChat();
   new ChatsController(this)
      .getChatUsers(this.props.chat.id)
      .then((users: TUser[]) => {
         this.props.users = users;
         if (users.length > 0) {
            this.$emit(this.EVENTS.UPDATE);
         }
      })
      .finally(HideChatInfoLoader);
}
