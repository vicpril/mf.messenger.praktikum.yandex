import "./ChatFilter.scss";

import { $ } from "../../../utils/dom-abstraction";
import template from "./ChatFilter.tmpl";
import { LeftSidebarViews } from "../../../controllers/LeftSidebar/LeftSidebarViews";

export const ChatFilter = {
   name: "ChatFilter",
   template: template,
   components: [],
   props: {},
   listeners: ["input"],
   subscribers: {
      toggleLeftSidebarView: function (view: LeftSidebarViews) {
         if (view === LeftSidebarViews.ChatsFilter) {
            showPanel.call(this);
         } else {
            hidePanel.call(this);
         }
      },
   },
   methods: {
      onInput(e: Event & { target: HTMLInputElement }) {
         if ($(e.target).hasClass("input__search_chats")) {
            this.$emit("ChatFilter:input", e.target.value);
         }
      },
   },
};

function showPanel() {
   this.$root.addClass("show");
}

function hidePanel() {
   this.$root.removeClass("show");
}
