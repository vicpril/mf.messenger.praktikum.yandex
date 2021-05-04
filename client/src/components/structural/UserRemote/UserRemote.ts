import "./UserRemote.scss";

import { Avatar } from "../Avatar/Avatar";
import template from "./UserRemote.tmpl";
import { $ } from "../../../utils/dom-abstraction";
import { ChatsController } from "../../../controllers/Chats/ChatsController";
import { TUser } from "../../../models/User";
import { NoticeStatus, notify } from "../../../core/notify/notify";

export const UserRemote = {
   name: "UserRemote",
   template: template,
   components: [Avatar],
   props: {
      user: {},
      chatUsers: [],
      isAdded: false,
   },
   listeners: ["click"],
   subscribers: {},
   methods: {
      onClick(e: Event & { target: HTMLButtonElement }): void {
         const action =
            e.target.dataset.action ?? $(e.target).parent().data.action;
         if (action === "add") {
            if (this.props.selectedChatId === 0) {
               notify("Select a chat first", NoticeStatus.WARNING);
            } else {
               new ChatsController(this).addUser(
                  this.props.user.id,
                  this.props.selectedChatId
               );
            }
         }
      },
   },
   async beforePrepare() {
      this.name = `${this.name}_${this.props.user.id}`;
      this.props.selectedChatId = ChatsController.getSelectedChatId();
      this.props.chatUsers = this.parentComponent.props.chatUsers;
      this.props.isAdded = userExists(this.props.user.id, this.props.chatUsers);
      this.props.css = this.props.isAdded ? "added" : "";
   },
   beforeCreate() {},
   beforeMount() {},
};

function userExists(userId: number, users: TUser[]): boolean {
   if (Array.isArray(users)) {
      return users.filter((user) => user.id === userId).length > 0;
   }
   return false;
}
