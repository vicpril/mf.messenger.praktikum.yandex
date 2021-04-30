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
import { isEmpty } from "../../../utils/isEmpty";

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
      "Chat:userDeleted": function () {
         refreshUsers.call(this);
      },
      "Chat:selected": function (id: number) {},
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
      this.props.selectedChatId = ChatsController.getSelectedChatId();
      if (this.props.selectedChatId !== null && this.props.selectedChatId > 0) {
         refreshUsers.call(this);
      }
   },
};

function refreshUsers() {
   this.props.chat = RightSidebarController.getChat();
   if (!isEmpty(this.props.chat)) {
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
}
