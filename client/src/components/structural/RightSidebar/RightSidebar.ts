import "./RightSidebar.scss";

import { $ } from "../../../utils/dom-abstraction";
import { InfoAccount } from "../InfoAccount/InfoAccount";
import template from "./RightSidebar.tmpl";
import { FormChangeAvatar } from "../FormChangeAvatar/FormChangeAvatar";
import { FormAccountSettings } from "../FormAccountSettings/FormAccountSettings";
import { FormPasswordChange } from "../FormPasswordChange/FormPasswordChange";
import { RightSidebarController } from "../../../controllers/RightSidebar/RightSidebarController";
import { RightSidebarDecorator } from "../../../controllers/RightSidebar/RightSidebarDecorators";
import { InfoChat } from "../InfoChat/InfoChat";
import { FormChangeChatAvatar } from "../FormChangeChatAvatar/FormChangeChatAvatar";

export const RightSidebar = RightSidebarDecorator({
   name: "RightSidebar",
   template: template,
   components: [
      InfoAccount,
      FormChangeAvatar,
      FormAccountSettings,
      FormPasswordChange,
      InfoChat,
      FormChangeChatAvatar,
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
