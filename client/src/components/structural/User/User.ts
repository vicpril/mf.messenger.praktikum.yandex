import "./User.scss";

import { Avatar } from "../Avatar/Avatar";
import template from "./User.tmpl";
import { $ } from "../../../utils/dom-abstraction";
import { ChatsController } from "../../../controllers/Chats/ChatsController";

export const User = {
   name: "User",
   template: template,
   components: [Avatar],
   props: {
      user: {},
      isAdmin: false,
   },
   listeners: ["click"],
   subscribers: {},
   methods: {
      onClick(e: Event & { target: HTMLButtonElement }): void {
         const action =
            e.target.dataset.action ?? $(e.target).parent().data.action;
         if (action === "delete") {
            if (
               // eslint-disable-next-line no-restricted-globals
               confirm(
                  `Are you sure you want to remove "${this.props.user.login}" from current chat?`
               )
            ) {
               const selectedChatId = ChatsController.getSelectedChatId();
               new ChatsController(this).deleteUser(
                  this.props.user.id,
                  selectedChatId
               );
            }
         }
      },
   },
   beforePrepare() {
      this.name = `${this.name}_${this.props.user.id}`;
      this.props.isAdmin = this.props.user.role === "admin";
   },
};
