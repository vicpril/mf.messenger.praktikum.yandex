import { Component } from "../../core/Component";
import { TMessengerState } from "../../core/store/stateTypes";
import { Store } from "../../core/store/Store";
import * as actions from "../../core/store/actions";
import { MessageTypes, TMessage } from "../../models/Message";
import { ChatsController } from "../Chats/ChatsController";
import { AccountController } from "../AccountController/AccountController";
// eslint-disable-next-line import/no-cycle
import { MessageLife, YPSocket } from "../../core/connections/YPSocket";
import { first, getFormData } from "../../utils/pure-functions";
import { mergeDeep } from "../../utils/mergeDeep";
import { sortByTime } from "../../utils/sortMessages";

export class MessengerController {
   private chatId: number;
   private userId: number;
   private static connection: YPSocket;

   constructor(private component: Component) {
      this.chatId =
         this.component.props.chat?.id ?? ChatsController.getSelectedChatId();
      this.userId =
         this.component.props.account?.id ?? AccountController.getAccount();
   }

   static getState(): TMessengerState {
      return Store.get().getState().messenger ?? {};
   }

   getChatMessages(
      chatId = this.chatId,
      sort: "asc" | "desc" = "asc"
   ): TMessage[] {
      const messages = MessengerController.getState()[chatId] ?? [];
      return sortByTime(messages, sort);
   }

   connect(): void {
      MessengerController.connection = new YPSocket(
         this.userId,
         this.chatId,
         this
      );
      MessengerController.connection.init();
   }

   sendTextMessage(formData: FormData) {
      const { message } = getFormData(formData);
      if (message !== "") {
         MessengerController.connection.send(message);
      }
   }

   onGetMessage(data: MessageLife) {
      if (data.type !== MessageTypes.USER_CONNECTED) {
         this.addMessages([data]);
      }
   }

   addMessages(data: MessageLife[] | TMessage[]) {
      let messages = mergeDeep(this.getChatMessages(), data) as TMessage[];
      Store.get().dispatch(actions.saveMessenger(this.chatId, messages));
      messages = sortByTime(messages, "desc");
      this.component.$emit("Message:new", this.chatId, first(messages));
   }
}
