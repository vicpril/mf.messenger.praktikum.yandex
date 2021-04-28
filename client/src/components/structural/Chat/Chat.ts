import "./Chat.scss";

import { $ } from "../../../utils/dom-abstraction";
import { AppService } from "../../../services/AppService";
import { Avatar } from "../Avatar/Avatar";
import { DateCustom } from "../../../utils/date";
import { TMessage } from "../../../models/types";
import { isEmpty } from "../../../utils/isEmpty";
import { sortByTime } from "../../../utils/sortMessages";
import template from "./Chat.tmpl";
import { InfoUser } from "../InfoUser/InfoUser";
import { Router } from "../../../core/router/Router";

export const Chat = {
   name: "Chat",
   template: template,
   components: [Avatar],
   props: {
      chat: {},
      selectedChat: {},
   },
   listeners: ["click"],
   subscribers: {},
   methods: {
      onClick(e: Event & { target: Element }): void {
         // Click on active Avatar
         if ($(e.target).hasClass("pulse")) {
            const { login } = this.props.chat.user;
            const data = { componentName: InfoUser.name, login };
            this.$emit("openRightSidebar", data);
         }
         // Click on wrapper
         else if (checkSwitchUserPossible(e.target)) {
            const { login } = this.props.chat.user;
            // document.location.href = `/?user=${login}`;
            Router.navigate("chats", login);
         }
      },
   },
   beforePrepare() {
      this.name = `${this.name}_${this.props.chat.user.login}`;
      this.props.selectedChat = AppService.getSelectedChat();
   },
   beforeCreate() {
      const P = this.props; // just alias
      P.is_selected =
         !isEmpty(P.selectedChat) &&
         P.selectedChat.user.login === P.chat.user.login;

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
