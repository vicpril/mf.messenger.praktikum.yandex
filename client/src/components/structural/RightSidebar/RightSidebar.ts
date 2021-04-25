import "./RightSidebar.scss";

import { $ } from "../../../utils/dom-abstraction";
import { InfoAccount } from "../../pages/InfoAccount/InfoAccount";
import template from "./RightSidebar.tmpl";
import { FormChangeAvatar } from "../../pages/FormChangeAvatar/FormChangeAvatar";
import { FormAccountSettings } from "../../pages/FormAccountSettings/FormAccountSettings";
import { FormPasswordChange } from "../../pages/FormPasswordChange/FormPasswordChange";
import { InfoUser } from "../../pages/InfoUser/InfoUser";
import { RightSidebarController } from "../../../controllers/RightSidebar/RightSidebarController";
import { RightSidebarDecorator } from "../../../controllers/RightSidebar/RightSidebarDecorators";

export const RightSidebar = RightSidebarDecorator({
   name: "RightSidebar",
   template: template,
   components: [
      FormChangeAvatar,
      FormAccountSettings,
      FormPasswordChange,
      InfoUser,
      InfoAccount,
   ],
   props: {
      page: "contact-info",
   },
   listeners: ["click"],
   subscribers: {},
   storeSubscribers: {
      rightSidebar: function () {
         new RightSidebarController(this).changeContent();
      },
   },
   methods: {
      onClick(e: Event & { target: Element }): void {
         // Click on active Avatar
         if ($(e.target).hasClass("button__close")) {
            this.$emit("closeRightSidebar");
         }
      },
   },
   beforeInitChildren() {
      new RightSidebarController(this).addContent();
   },
});
