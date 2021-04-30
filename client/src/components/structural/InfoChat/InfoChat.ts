import "./InfoChat.scss";

import { Avatar } from "../Avatar/Avatar";
import template from "./InfoChat.tmpl";
import { RightSidebarController } from "../../../controllers/RightSidebar/RightSidebarController";
import { ChatsController } from "../../../controllers/Chats/ChatsController";
import { LoaderIncfoChatTemplate as loader } from "./InfoChatLoader";
import "../../../core/loader/loader.scss";

export const InfoChat = {
   name: "InfoChat",
   template: template,
   components: [Avatar],
   props: {
      chat: {},
      users: [],
      loader: loader,
   },
   listeners: ["click"],
   subscribers: {},
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
      this.props.chat = RightSidebarController.getChat();
   },
   async beforeCreate() {
      this.props.users = await new ChatsController(this).getChatUsers(
         this.props.chat.id
      );
   },
};
