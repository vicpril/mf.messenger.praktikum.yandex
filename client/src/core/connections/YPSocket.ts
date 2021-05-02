import { AuthController } from "../../controllers/Auth/AuthController";
import { ChatsController } from "../../controllers/Chats/ChatsController";
// eslint-disable-next-line import/no-cycle
import { MessengerController } from "../../controllers/Messenger/MessengerController";
import { MessageTypes } from "../../models/Message";
import { notifyError } from "../notify/notify";

type MessageType = MessageTypes;

export type MessageLife = {
   id: number;
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
   // private static _instanse: YPSocket;

   constructor(
      private userId: number,
      private chatId: number,
      private messengerController: MessengerController,
      public uploadMode: boolean = false
   ) {}

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
      try {
         console.log("Получены данные", event.data);
         const data = JSON.parse(event.data);
         if (!Array.isArray(data)) {
            // single messsage
            this.messengerController.onGetMessage(data);
         } else {
            this.messengerController.onUploadMessages(data);
         }
      } catch (error) {
         console.warn(error.message);
      }
   };

   private onError = (event: ErrorEvent) => {
      console.warn("Ошибка", event.message);
   };

   async init() {
      try {
         if (this.socket) {
            this.destroy();
         }

         if (AuthController.isAuth()) {
            // get token
            const token = await ChatsController.getToken(this.chatId);

            this.host = `${this.basehost}/${this.userId}/${this.chatId}/${token}`;

            this.socket = new WebSocket(this.host);

            this.socket.addEventListener("open", this.onOpen);
            this.socket.addEventListener("close", this.onClose);
            this.socket.addEventListener("message", this.onMessage);
            this.socket.addEventListener("error", this.onError);
         } else if (this.socket) {
            this.close();
         }
      } catch (error) {
         console.log("~ error", error);
         notifyError("Connection failed");
      }
   }

   async send(content: string, type: MessageType = MessageTypes.MESSAGE) {
      const send = function () {
         this.socket?.send(
            JSON.stringify({
               content,
               type,
            })
         );
      };

      try {
         if (this.socket?.readyState === 1) {
            send.call(this);
         } else {
            setTimeout(() => {
               send.call(this);
            }, 500);
         }
      } catch (error) {
         console.warn("Send message error", error);
      }
   }

   async fetch(lastFetchedMessageId: number = 0) {
      try {
         await this.send(lastFetchedMessageId.toString(), MessageTypes.GET_OLD);
      } catch (error) {
         console.warn("Send message error", error);
      }
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
         console.log("Connection closed");
      }
   }
}
