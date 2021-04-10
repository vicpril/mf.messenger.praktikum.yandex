import "./RightSidebar.scss";

import { $ } from "../../../utils/dom-abstraction";
import { InfoAccount } from "../../pages/InfoAccount/InfoAccount";
import template from "./RightSidebar.tmpl";
import { FormChangeAvatar } from "../../pages/FormChangeAvatar/FormChangeAvatar";

export const RightSidebar = {
   name: "RightSidebar",
   template: template,
   components: [],
   props: {
      page: "avatar-edit",
   },
   listeners: ["click"],
   subscribers: {},
   methods: {
      onClick(e: Event & { target: Element }): void {
         // Click on active Avatar
         if ($(e.target).hasClass("button__close")) {
            this.$emit("closeRightSidebar");
         }
      },
   },
   beforePrepare() {
      switch (this.props.page) {
         case "avatar-edit":
            this.components = [FormChangeAvatar];
            this.template = switchContentTag("FormChangeAvatar", this.template);
            break;
         case "settings-edit":
            // this.components = [AccountSettings];
            this.template = switchContentTag("AccountSettings", this.template);
            break;
         case "password-change":
            // this.components = [ChangePassword];
            this.template = switchContentTag("ChangePassword", this.template);
            break;
         case "contact-info":
            // this.components = [InfoContact];
            this.template = switchContentTag("InfoContact", this.template);
            break;
         case "account":
         default:
            this.components = [InfoAccount];
            this.template = switchContentTag("InfoAccount", this.template);
            break;
      }
   },
};

function switchContentTag(newTagName: string, template: string): string {
   return template.replace(/Content/gis, newTagName);
}
