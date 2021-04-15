import "./RightSidebar.scss";

import { $ } from "../../../utils/dom-abstraction";
import { InfoAccount } from "../../pages/InfoAccount/InfoAccount";
import template from "./RightSidebar.tmpl";
import { FormChangeAvatar } from "../../pages/FormChangeAvatar/FormChangeAvatar";
import { FormAccountSettings } from "../../pages/FormAccountSettings/FormAccountSettings";
import { FormPasswordChange } from "../../pages/FormPasswordChange/FormPasswordChange";
import { InfoUser } from "../../pages/InfoUser/InfoUser";

export const RightSidebar = {
   name: "RightSidebar",
   template: template,
   components: [],
   props: {
      page: "contact-info",
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
            this.components = [FormAccountSettings];
            this.template = switchContentTag(
               "FormAccountSettings",
               this.template
            );
            break;
         case "password-change":
            this.components = [FormPasswordChange];
            this.template = switchContentTag(
               "FormPasswordChange",
               this.template
            );
            break;
         case "contact-info":
            this.components = [InfoUser];
            this.template = switchContentTag("InfoUser", this.template);
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
