import "./Chat.scss";

import { $ } from "../../../utils/dom-abstraction";
import { Avatar } from "../Avatar/Avatar";
import { DateCustom } from "../../../utils/date";
import { TMessage } from "../../../models/types";
import { isEmpty } from "../../../utils/isEmpty";
import { sortByTime } from "../../../utils/sortMessages";
import template from "./Chat.tmpl";
import * as actions from "../../../core/store/actions";
import { ChatsController } from "../../../controllers/Chats/ChatsController";
import { InfoChat } from "../InfoChat/InfoChat";

export const Chat = {
   name: "Chat",
   template: template,
   components: [Avatar],
   props: {
      chat: {},
   },
   listeners: ["click"],
   subscribers: {},
   methods: {
      onClick(e: Event & { target: Element }): void {
         // Click on active Avatar
         if ($(e.target).hasClass("pulse")) {
            const { chat } = this.props;
            const data = { componentName: InfoChat.name, chat };
            this.$emit("openRightSidebar", data);
            selectThisChat.call(this);
         }
         // Click on wrapper
         else if (checkSwitchUserPossible(e.target)) {
            selectThisChat.call(this);
         }
      },
      setActive: function () {
         this.$root.find(".user__wrapper").addClass("user__active");
      },
      setInactive: function () {
         this.$root.find(".user__wrapper").removeClass("user__active");
      },
   },
   beforePrepare() {
      this.name = `${this.name}_${this.props.chat.id}`;
      this.props.selectedChat = ChatsController.getSelectedChatId();
   },
   beforeCreate() {
      const P = this.props; // just alias
      P.last_message_content = P.chat.last_message?.content ?? "";
      P.last_message_date = P.chat.last_message?.time
         ? new DateCustom(+P.chat.last_message?.time).getDateFormatted
         : "";
      P.counter = getCounter(P.chat.unread_messages);
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

function selectThisChat() {
   if (!this.name.startsWith("Chat")) {
      throw new Error("`this` is not defined as Chat Component");
   }
   const { id } = this.props.chat;
   this.$dispatch(actions.selectChat(id));
   this.$emit("Chat:selected", id);
}
