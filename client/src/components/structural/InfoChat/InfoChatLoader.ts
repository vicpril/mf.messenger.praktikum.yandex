import "../../../core/loader/loader.scss";
import { $ } from "../../../utils/dom-abstraction";

export function ShowChatInfoLoader() {
   if ($(".chat_users").$el) {
      $(".chat_users").addClass("loading");
   }
}

export function HideChatInfoLoader() {
   if ($(".chat_users").$el) {
      $(".chat_users").removeClass("loading");
   }
}
