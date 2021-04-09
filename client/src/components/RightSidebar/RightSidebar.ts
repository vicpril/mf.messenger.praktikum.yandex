import "./RightSidebar.scss";

import { $, TDomAbstraction } from "../../utils/dom-abstraction";

import { InfoAccount } from "../InfoAccount/InfoAccount";
import template from "./RightSidebar.tmpl";

export const RightSidebar = {
   name: "RightSidebar",
   template: template,
   components: [],
   props: {
      page: "account",
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
            // this.components = [ChangeAvatar];
            this.template = switchContentTag("ChangeAvatar", this.template);
         case "settings-edit":
            // this.components = [AccountSettings];
            this.template = switchContentTag("AccountSettings", this.template);
         case "password-change":
            // this.components = [ChangePassword];
            this.template = switchContentTag("ChangePassword", this.template);
         case "contact-info":
            // this.components = [InfoContact];
            this.template = switchContentTag("InfoContact", this.template);
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
