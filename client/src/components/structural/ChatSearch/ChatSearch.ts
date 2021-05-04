import "./ChatSearch.scss";

import { $ } from "../../../utils/dom-abstraction";
import template from "./ChatSearch.tmpl";
import { LeftSidebarViews } from "../../../controllers/LeftSidebar/LeftSidebarViews";

export const ChatSearch = {
   name: "ChatSearch",
   template: template,
   components: [],
   props: {},
   listeners: ["input"],
   subscribers: {
      toggleLeftSidebarView: function (view: LeftSidebarViews) {
         if (view === LeftSidebarViews.ChatsSearch) {
            this.$root.find("input").val("");
            showPanel.call(this);
         } else {
            hidePanel.call(this);
         }
      },
   },
   methods: {
      onInput(e: Event & { target: HTMLInputElement }) {
         if ($(e.target).hasClass("input__search_chats")) {
            this.$emit("ChatSearch:input", e.target.value);
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
