import "./InfoChat.scss";

import { Avatar } from "../Avatar/Avatar";
import template from "./InfoChat.tmpl";
import { RightSidebarController } from "../../../controllers/RightSidebar/RightSidebarController";

export const InfoChat = {
   name: "InfoChat",
   template: template,
   components: [Avatar],
   props: {
      chat: {},
   },
   listeners: ["click"],
   subscribers: {},
   methods: {
      onClick(e: Event & { target: HTMLElement }) {
         if (e.target.dataset.action === "changeAvatar") {
            console.log(
               `Notifications from ${this.props.user.display_name} muted!`
            );
         } else if (e.target.dataset.action === "delete-user") {
            console.log(
               `${this.props.user.display_name} was deleted from your contact list!`
            );
         } else if (e.target.dataset.action === "change-password") {
            document.location.href = "/password-change.html";
         }
      },
   },
   beforePrepare() {
      this.props.chat = RightSidebarController.getChat();
   },
};
