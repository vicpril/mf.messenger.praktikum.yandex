import "./ChatSearch.scss";

import { $ } from "../../../utils/dom-abstraction";
import template from "./ChatSearch.tmpl";

export const ChatSearch = {
   name: "ChatSearch",
   template: template,
   components: [],
   props: {},
   listeners: ["input"],
   subscribers: {},
   methods: {
      onInput(e: Event & { target: HTMLInputElement }) {
         if ($(e.target).hasClass("input__search_chats")) {
            this.$emit("ChatSearch:input", e.target.value);
         }
      },
   },
};
