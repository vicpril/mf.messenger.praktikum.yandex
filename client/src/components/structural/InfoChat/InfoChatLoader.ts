import loader from "../../../core/loader/loader.tmpl";
import "../../../core/loader/loader.scss";
import { $ } from "../../../utils/dom-abstraction";

export const LoaderIncfoChatTemplate = `
<div class="chat_info__loader show">${loader}</div>
`;

export function ShowChatInfoLoader() {
   if ($(".chat_info__loader").$el) {
      $(".chat_info__loader").addClass("show");
   }
}

export function HideChatInfoLoader() {
   if ($(".chat_info__loader").$el) {
      $(".chat_info__loader").removeClass("show");
   }
}
