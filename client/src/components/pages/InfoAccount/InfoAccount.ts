import "./InfoAccount.scss";

import { AppService } from "../../../services/AppService";
import { Avatar } from "../../structural/Avatar/Avatar";
import template from "./InfoAccount.tmpl";

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
         if (e.target.dataset.action === "change-avatar") {
            document.location.href = "/avatar-edit.html";
         } else if (e.target.dataset.action === "account-settings") {
            document.location.href = "/settings-edit.html";
         } else if (e.target.dataset.action === "change-password") {
            document.location.href = "/password-change.html";
         }
      },
   },
   beforePrepare() {
      this.props.user = AppService.getAccount();
   },
};
