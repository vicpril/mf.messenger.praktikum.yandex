import "./ChatAccount.scss";

import { $ } from "../../utils/dom-abstraction";
import { Avatar } from "../Avatar/Avatar";
import template from "./ChatAccount.tmpl";

export const ChatAccount = {
   name: "ChatAccount",
   template: template,
   components: [Avatar],
   props: {
      account: {},
   },
   listeners: ["click"],
   subscribers: {},
   methods: {
      onClick(e: Event & { target: Element }): void {
         if (!$(e.target).hasClass("button__user_settings")) return;
         document.location.href = "/account.html";
      },
   },
};
