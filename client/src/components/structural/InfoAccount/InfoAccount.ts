import "./InfoAccount.scss";

import { Avatar } from "../Avatar/Avatar";
import template from "./InfoAccount.tmpl";
import { AccountController } from "../../../controllers/AccountController/AccountController";

export const InfoAccount = {
   name: "InfoAccount",
   template: template,
   components: [Avatar],
   props: {
      user: {},
   },
   listeners: [],
   subscribers: {},

   methods: {},
   beforePrepare() {
      this.props.user = AccountController.getAccount();
   },
};
