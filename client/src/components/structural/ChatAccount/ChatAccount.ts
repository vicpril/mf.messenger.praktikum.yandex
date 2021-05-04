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
      onClick(e: Event & { target: HTMLButtonElement }): void {
         const action =
            e.target.dataset.action || $(e.target).parent().data.action;
         if (action === "settings")
            this.$emit("toggleRightSidebar", {
               componentName: InfoAccount.name,
            });
      },
   },
   beforeCreate() {
      this.props.account = AccountController.getAccount();
   },
};
