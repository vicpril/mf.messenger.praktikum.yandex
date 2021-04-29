import "./UserRemote.scss";

import { Avatar } from "../Avatar/Avatar";
import template from "./UserRemote.tmpl";
import { TChat } from "../../../models/types";
import { $ } from "../../../utils/dom-abstraction";

export const UserRemote = {
   name: "UserRemote",
   template: template,
   components: [Avatar],
   props: {
      user: {},
      chats: {},
      isAdded: false,
   },
   listeners: ["click"],
   subscribers: {},
   methods: {
      onClick(e: Event & { target: HTMLButtonElement }): void {
         const action =
            e.target.dataset.action ?? $(e.target).parent().data.action;
         if (action === "add") {
            this.props.css = "added";
            this.$emit(this.EVENTS.UPDATE);
         }
      },
   },
   beforePrepare() {
      this.name = `${this.name}_${this.props.user.login}`;
      this.props.isAdded = isInChats(this.props.user.login, this.props.chats);
      this.props.css = this.props.isAdded ? "added" : "";
   },
   beforeCreate() {},
   beforeMount() {},
};

function isInChats(login: string, chats: TChat[]): boolean {
   return chats.filter((chat) => chat.user.login === login).length > 0;
}
