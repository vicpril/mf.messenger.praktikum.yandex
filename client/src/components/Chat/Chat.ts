import "./Chat.scss";

import { $ } from "../../utils/dom-abstraction";
import { AppService } from "../../services/AppService";
import { Avatar } from "../Avatar/Avatar";
import { ChatSearch } from "../ChatSearch/ChatSearch";
import { DateCustom } from "../../utils/date";
import { TMessage } from "../../models/types";
import { isEmpty } from "../../utils/isEmpty";
import { sortByTime } from "../../utils/sortMessages";
import template from "./Chat.tmpl";

export const Chat = {
   name: "Chat",
   template: template,
   components: [Avatar],
   props: {
      chat: {},
      selectedUser: AppService.getSelectedUser(),
   },
   listeners: ["click"],
   subscribers: {},
   methods: {
      onClick(e: Event & { target: Element }): void {
         // Click on active Avatar
         if ($(e.target).hasClass("pulse")) {
            const login = this.props.chat.user.login;
            document.location.href = `/contact-info.html?info=${login}`;
         }
         // Click on wrapper
         else if (checkSwitchUserPossible(e.target)) {
            const login = this.props.chat.user.login;
            document.location.href = `/?user=${login}`;
         }
      },
   },
   beforePrepare() {
      this.name = `${this.name}_${this.props.chat.user.login}`;
   },
   beforeCreate() {
      const P = this.props; // just alias
      P.is_selected = P.selectedUser === P.chat.user.login;

      const lastMessage = getLastMessage(P.chat.data.messages);

      P.lastMessage = lastMessage;

      if (lastMessage) {
         P.last_message_content = lastMessage.content;
         P.last_message_date = new DateCustom(
            +lastMessage.time
         ).getDateFormatted;
      }

      P.counter = getCounter(P.chat.data.messages);
   },
};

function getLastMessage(messages: TMessage[]): TMessage | null {
   return !isEmpty(messages) ? sortByTime(messages)[0] : null;
}

function getCounter(messages: TMessage[]): number | undefined {
   return !isEmpty(messages)
      ? sortByTime(messages).filter((m) => m.unread).length
      : 0;
}

function checkSwitchUserPossible(element: Element): boolean {
   const $wrapper = $(element).closest(".user__wrapper");
   if (!$wrapper) return false;
   if ($wrapper.hasClass("user__active")) return false;
   return true;
}
