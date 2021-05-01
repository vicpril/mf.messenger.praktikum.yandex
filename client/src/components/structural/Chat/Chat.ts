import "./Chat.scss";

import { $ } from "../../../utils/dom-abstraction";
import { Avatar } from "../Avatar/Avatar";
import { DateCustom } from "../../../utils/date";
import { isEmpty } from "../../../utils/isEmpty";
import { sortByTime } from "../../../utils/sortMessages";
import template from "./Chat.tmpl";
import * as actions from "../../../core/store/actions";
import { ChatsController } from "../../../controllers/Chats/ChatsController";
import { InfoChat } from "../InfoChat/InfoChat";
import { MessageLife } from "../../../core/connections/YPSocket";
import { TMessage } from "../../../models/Message";

export const Chat = {
   name: "Chat",
   template: template,
   components: [Avatar],
   props: {
      chat: {},
   },
   listeners: ["click"],
   subscribers: {
      "Message:new": function (id: number, message?: TMessage) {
         if (this.props.chat.id === id) {
            if (message) {
               setLastMessage.call(this, message);
               this.$emit(this.EVENTS.UPDATE);
            }
         }
      },
   },
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
            const { chat } = this.props;
            const data = { componentName: InfoChat.name, chat };
            this.$emit("refreshRightSidebar", data);
            selectThisChat.call(this);
         }
      },
      setActive: function () {
         this.$root.find(".chat__wrapper").addClass("chat__active");
      },
      setInactive: function () {
         this.$root.find(".chat__wrapper").removeClass("chat__active");
      },
   },
   beforePrepare() {
      this.name = `${this.name}_${this.props.chat.id}`;
      this.props.selectedChatId = ChatsController.getSelectedChatId();
      setLastMessage.call(this);
   },
   beforeCreate() {
      this.props.counter = getCounter(this.props.chat.unread_messages);
   },
   beforeMount() {
      if (this.props.selectedChatId === this.props.chat.id) {
         this.methods.setActive.call(this);
      }
   },
};

function setLastMessage(message?: TMessage | MessageLife): void {
   const P = this.props; // just alias
   P.last_message_content =
      message?.content || P.chat.last_message?.content || "";

   const dateString = message?.time || P.chat.last_message?.time || null;
   const date = Date.parse(dateString);
   P.last_message_date = date ? new DateCustom(+date).getDateFormatted : "";
}

function getCounter(messages: TMessage[]): number | undefined {
   return !isEmpty(messages)
      ? sortByTime(messages).filter((m) => m.unread).length
      : 0;
}

function checkSwitchUserPossible(element: Element): boolean {
   const $wrapper = $(element).closest(".chat__wrapper");
   if (!$wrapper) return false;
   if ($wrapper.hasClass("chat__active")) return false;
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
