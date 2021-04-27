import "./InfoAccount.scss";

import { Avatar } from "../Avatar/Avatar";
import template from "./InfoAccount.tmpl";
import { AccountController } from "../../../controllers/AccountController/AccountController";
import { AuthController } from "../../../controllers/Auth/AuthController";

export const InfoAccount = {
   name: "InfoAccount",
   template: template,
   components: [Avatar],
   props: {
      user: {},
   },
   listeners: ["click"],
   subscribers: {},

   methods: {
      onClick(e: Event & { target: HTMLElement }) {
         if (e.target.dataset.action === "logout") {
            new AuthController(this).logout();
         }
      },
   },
   beforePrepare() {
      this.props.user = AccountController.getAccount();
   },
};
