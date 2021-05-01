import "./Chat.scss";

import { $ } from "../../../utils/dom-abstraction";
import { Avatar } from "../Avatar/Avatar";
import { DateCustom } from "../../../utils/date";
import template from "./Chat.tmpl";
import * as actions from "../../../core/store/actions";
import { ChatsController } from "../../../controllers/Chats/ChatsController";
import { InfoChat } from "../InfoChat/InfoChat";
import { MessageLife } from "../../../core/connections/YPSocket";
import { TMessage } from "../../../models/Message";
import { TChat } from "../../../models/Chat";
import { first } from "../../../utils/pure-functions";
import { TChatsState } from "../../../core/store/stateTypes";
import { isEmpty } from "../../../utils/isEmpty";
import { MessengerController } from "../../../controllers/Messenger/MessengerController";

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
      "Chat:selected": function (id: number) {
         if (this.props.chat.id === id) {
            this.methods.hideCounter.call(this);
            this.props.is_selected = true;
         } else {
            this.props.is_selected = false;
         }
      },
   },
   storeSubscribers: {
      chats: function (chats: TChatsState) {
         if (!chats.availableChats) return;
         const chat = first(
            chats.availableChats.filter(
               (chat: TChat) =>
                  chat.id === this.props.chat.id &&
                  chat.unread_count > this.props.chat.unread_count
            )
         );
         if (!isEmpty(chat) && !this.props.is_selected) {
            this.methods.showCounter.call(this);
            setLastMessage.call(this, chat.last_message);
         } else {
            this.methods.hideCounter.call(this);
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
      showCounter() {
         this.$root.find(".unread_messages_counter").removeClass("is_null");
      },
      hideCounter() {
         this.$root.find(".unread_messages_counter").addClass("is_null");
      },
   },
   beforePrepare() {
      this.name = `${this.name}_${this.props.chat.id}`;
      this.props.selectedChatId = ChatsController.getSelectedChatId();
      setLastMessage.call(this);
   },
   beforeMount() {
      if (this.props.selectedChatId === this.props.chat.id) {
         this.methods.setActive.call(this);
         this.methods.hideCounter.call(this);
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

   if (this.$root) {
      this.$root.find(".chat__last_message").html(P.last_message_content);
      this.$root.find(".last_message_date").html(P.last_message_date);
   }
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
