import "./ChatsMenu.scss";

import { $, TDomAbstraction } from "../../../utils/dom-abstraction";
import template from "./ChatsMenu.tmpl";
import { LeftSidebarViews } from "../../../controllers/LeftSidebar/LeftSidebarViews";
import * as actions from "../../../core/store/actions";
import { LeftSidebarController } from "../../../controllers/LeftSidebar/LeftSidebarController";

export const ChatsMenu = {
   name: "ChatsMenu",
   template: template,
   components: [],
   props: {},
   listeners: ["click"],
   subscribers: {
      toggleLeftSidebarView: toggleButton,
   },
   methods: {
      onClick(e: Event & { target: HTMLInputElement }) {
         const view = e.target.dataset.view ?? $(e.target).parent().data.view;
         if (view) {
            goToView.call(this, view);
            this.$emit(`toggleLeftSidebarView`, view);
         }
      },
   },
   afterInit() {
      const sidebarView = LeftSidebarController.getSidebarView();
      this.$emit(`toggleLeftSidebarView`, sidebarView);
   },
};

function goToView(view: string): void {
   if (view in LeftSidebarViews) {
      const actionData = { view };
      this.$dispatch(actions.leftSidebar(actionData));
      toggleButton.call(this, view);
   }
}

function toggleButton(view: string): void {
   const $targetBtn = this.$root.find(
      `[data-view="${view}"]`
   ) as TDomAbstraction;
   this.$root.findAll("button").forEach((element: HTMLButtonElement) => {
      $(element).removeClass("active");
   });
   $targetBtn.addClass("active");
}
