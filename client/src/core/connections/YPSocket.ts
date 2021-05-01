import { ChatsController } from "../../controllers/Chats/ChatsController";
// eslint-disable-next-line import/no-cycle
import { MessengerController } from "../../controllers/Messenger/MessengerController";
import { MessageTypes } from "../../models/Message";
import { notifyError } from "../notify/notify";

type MessageType = MessageTypes;

export type MessageLife = {
   id: string;
   time: string;
   user_id: string;
   content: string;
   type: MessageTypes;
};

export class YPSocket {
   // private host = "wss://ya-praktikum.tech/ws/chats/<userId>/<chatId>/<token>"
   private basehost = "wss://ya-praktikum.tech/ws/chats";
   private host = "";

   private socket: WebSocket | null = null;
   private static _instanse: YPSocket;

   constructor(
      private userId: number,
      private chatId: number,
      private messengerController: MessengerController
   ) {
      if (YPSocket._instanse) {
         YPSocket._instanse.userId = this.userId;
         YPSocket._instanse.chatId = this.chatId;
         YPSocket._instanse.messengerController = this.messengerController;
         return YPSocket._instanse;
      }

      YPSocket._instanse = this;
   }

   private onOpen = () => {
      console.log("Connect successful!");
   };

   private onClose = (event: CloseEvent) => {
      console.log(`Code: ${event.code} | Reason: ${event.reason}`);
      if (event.wasClean) {
         console.log("Connection close OK");
      } else {
         console.warn("Lost connection");
         try {
            this.messengerController.connect();
            console.log("Connection reused");
         } catch (error) {
            console.warn(error);
         }
      }
   };

   private onMessage = (event: MessageEvent & { data: string }) => {
      console.log("Получены данные", event.data);
      this.messengerController.onGetMessage(JSON.parse(event.data));
   };

   private onError = (event: ErrorEvent) => {
      console.warn("Ошибка", event.message);
      notifyError(event.message);
   };

   async init() {
      try {
         if (this.socket) {
            this.destroy();
         }
         // get token
         const token = await ChatsController.getToken(this.chatId);

         this.host = `${this.basehost}/${this.userId}/${this.chatId}/${token}`;

         this.socket = new WebSocket(this.host);

         this.socket.addEventListener("open", this.onOpen);
         this.socket.addEventListener("close", this.onClose);
         this.socket.addEventListener("message", this.onMessage);
         this.socket.addEventListener("error", this.onError);
      } catch (error) {
         console.log("~ error", error);
         notifyError("Connection failed");
      }
   }

   send(content: string, type: MessageType = MessageTypes.MESSAGE) {
      try {
         this.socket?.send(
            JSON.stringify({
               content,
               type,
            })
         );
      } catch (error) {
         console.warn("Send message error", error);
         notifyError(error);
      }
   }

   fetch(lastFetchedMessageId: number = 0) {
      const messages = this.socket?.send(
         JSON.stringify({
            content: lastFetchedMessageId.toString(),
            type: MessageTypes.GET_OLD,
         })
      );
      console.log("~ messages", messages);
      // return messages as TMessage[];
   }

   destroy() {
      if (this.socket) {
         this.socket.removeEventListener("open", this.onOpen);
         this.socket.removeEventListener("close", this.onClose);
         this.socket.removeEventListener("message", this.onMessage);
         this.socket.removeEventListener("error", this.onError);
         this.socket = null;
      }
   }

   close(reason: string = "Chat deleted") {
      if (this.socket) {
         this.socket.close(1000, reason);
         this.destroy();
      }
   }

   static getInstance(): YPSocket {
      if (!YPSocket._instanse)
         throw new Error("YPSocket must be created manually");
      return YPSocket._instanse;
   }
}
