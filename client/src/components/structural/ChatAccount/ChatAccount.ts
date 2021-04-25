import "./ChatAccount.scss";

import { $ } from "../../../utils/dom-abstraction";
import { Avatar } from "../Avatar/Avatar";
import template from "./ChatAccount.tmpl";
import { InfoAccount } from "../InfoAccount/InfoAccount";
import { AccountController } from "../../../controllers/AccountController/AccountController";

export const ChatAccount = {
   name: "ChatAccount",
   template: template,
   components: [Avatar],
   props: {
      account: {},
   },
   listeners: ["click"],
   subscribers: {},
   storeSubscribers: {
      accountSettings: function (changes: any) {
         this.props.account = changes;
         this.$emit(this.EVENTS.UPDATE);
      },
   },
   methods: {
      onClick(e: Event & { target: Element }): void {
         if (!$(e.target).hasClass("button__user_settings")) return;
         this.$emit("openRightSidebar", { componentName: InfoAccount.name });
      },
   },
   beforePrepare() {
      this.props.account = AccountController.getAccount();
   },
};
