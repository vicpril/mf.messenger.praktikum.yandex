import { Component } from "../../core/Component";
import { TMessengerState } from "../../core/store/stateTypes";
import { Store } from "../../core/store/Store";
import * as actions from "../../core/store/actions";
import { MessageTypes, TMessage } from "../../models/Message";
import { ChatsController } from "../Chats/ChatsController";
import { AccountController } from "../AccountController/AccountController";
// eslint-disable-next-line import/no-cycle
import { MessageLife, YPSocket } from "../../core/connections/YPSocket";
import { first, getFormData, last } from "../../utils/pure-functions";
import { mergeDeep } from "../../utils/mergeDeep";
import { sortByTime } from "../../utils/sortMessages";
import { mergeObjects } from "../../utils/mergeObjects";
import {
   HideLeftSidebarLoader,
   ShowLeftSidebarLoader,
} from "../LeftSidebar/LeftSidebarLoader/LeftSidebarLoader";
import { HideLoader, ShowLoader } from "../../core/loader/loader";
import { htmlspecialchars } from "../../utils/htmlspecialchars";

let lastMessageId: number;
let unreadCount: number;
let uploadedMessages: MessageLife[];
export class MessengerController {
   private chatId: number;
   private userId: number;
   private static connection: YPSocket;

   // private static lastMessageId: string;

   constructor(private component: Component) {
      this.chatId =
         this.component.props.chat?.id ?? ChatsController.getSelectedChatId();
      this.userId =
         this.component.props.account?.id ?? AccountController.getAccount();
   }

   static getState(): TMessengerState {
      return Store.get().getState().messenger ?? {};
   }

   getChatMessages(chatId = this.chatId): TMessage[] {
      const messages =
         MessengerController.getState()[chatId]?.filter(filterMessageType) ??
         [];
      return messages;
   }

   connect(): void {
      MessengerController.connection = new YPSocket(
         this.userId,
         this.chatId,
         this
      );
      MessengerController.connection.init();
   }

   disconnect() {
      if (MessengerController.connection) {
         MessengerController.connection.close();
      }
   }

   static destroy() {
      if (MessengerController.connection) {
         MessengerController.connection.close();
      }
   }

   async sendTextMessage(message: FormData | string) {
      if (typeof message !== "string") {
         message = htmlspecialchars(getFormData(message).message);
      }

      if (message !== "") {
         await MessengerController.connection.send(message as string);
      }
   }

   onGetMessage(data: MessageLife) {
      // single message
      if (
         data.type === MessageTypes.MESSAGE ||
         data.type === MessageTypes.FILE
      ) {
         this.addMessages([data]);
      }
   }

   onUploadMessages(data: MessageLife[]) {
      ShowLoader()();
      uploadedMessages = [
         ...(uploadedMessages ?? []),
         ...data,
      ] as MessageLife[];
      const countMessages = uploadedMessages.length;

      if (countMessages > 0 && countMessages < unreadCount) {
         lastMessageId = (last(data) as MessageLife).id;
         this.fetchMessages(this.chatId, lastMessageId);
      } else {
         this.updateChatMessages(uploadedMessages);
         HideLoader();
         unreadCount = 0;
         lastMessageId = 0;
         uploadedMessages = [];
      }
   }

   addMessages(data: MessageLife[] | TMessage[]) {
      let messages = mergeDeep(this.getChatMessages(), data) as TMessage[];
      Store.get().dispatch(actions.saveMessenger(this.chatId, messages));
      messages = sortByTime(messages, "asc");
      this.component.$emit("Message:new", this.chatId, first(messages));
   }

   updateChatMessages(data: MessageLife[] | TMessage[]) {
      let messages = this.mergeMessages(
         this.getChatMessages(),
         data as TMessage[]
      ) as TMessage[];
      messages = sortByTime(messages, "asc");
      Store.get().dispatch(actions.updateChetMessages(this.chatId, messages));
      this.component.$emit("Message:new");
   }

   private mergeMessages<T extends TMessage>(messages: T[], data: T[]) {
      const messagesObj = messages.reduce((acc: any, curr: T) => {
         acc[curr.id?.toFixed() || 0] = curr;
         return acc;
      }, {} as T);
      const dataObj = data.reduce((acc: any, curr: T) => {
         acc[curr.id?.toFixed() || 0] = curr;
         return acc;
      }, {});

      const result = { ...messagesObj, ...dataObj };

      return Object.values(result) as T[];
   }

   async fetchMessages(chatId: number, lastId: number = 0) {
      unreadCount = await ChatsController.getNewMessagesCount(chatId);

      if (unreadCount > 0) {
         await MessengerController.connection.fetch(lastId);
      }
   }
}

const filterMessageType = (message: TMessage) =>
   message.type === MessageTypes.MESSAGE || message.type === MessageTypes.FILE;
