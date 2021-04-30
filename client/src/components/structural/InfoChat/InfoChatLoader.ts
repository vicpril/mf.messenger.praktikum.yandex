import loader from "../../../core/loader/loader.tmpl";
import "../../../core/loader/loader.scss";
import { $ } from "../../../utils/dom-abstraction";

export const LoaderIncfoChatTemplate = `
<div class="chat_info__loader">${loader}</div>
`;

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
