import "./RightSidebar.scss";
import "./Toggler.scss";

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
import * as actions from "../../../core/store/actions";
import { Store } from "../../../core/store/Store";

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
      theme: "light",
   },
   listeners: ["click", "change"],
   subscribers: {},
   storeSubscribers: {
      rightSidebar: function () {
         new RightSidebarController(this).changeContent();
      },
      theme: function (theme) {
         this.$root.find("#theme_mode").text(theme);
      },
   },
   methods: {
      onClick(e: Event & { target: Element }): void {
         // Click on active Avatar
         if ($(e.target).hasClass("button__close")) {
            this.$emit("closeRightSidebar");
         }
      },
      onChange(e: Event & { target: Element }) {
         // Click on toggler

         if ($(e.target).hasId("themeToggler")) {
            console.log("~ toggler", "toggler click");
            this.$dispatch(actions.toggleTheme());
         }
      },
   },
   beforeInitChildren() {
      new RightSidebarController(this).addContent();
   },
   beforePrepare() {
      const theme = Store.get().getState().theme || "light";
      this.props.theme = theme;
   },
   beforeMount() {
      const theme = Store.get().getState().theme || "light";
      const toggler = this.$root.find("#themeToggler").$el as HTMLInputElement;
      console.log("~ toggler", toggler);
      if (toggler) {
         if (theme === "light") {
            toggler.checked = false;
         } else {
            toggler.checked = true;
         }
      }
   },
});
