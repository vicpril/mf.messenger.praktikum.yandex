import { ChatResponse } from "../core/xhr/ChatsAPI";
import { User } from "./User";

export type TChat = Chat;

export class Chat {
   id: number;
   title: string;
   avatar: string;
   unread_count: number;
   last_message: {
      user: User;
      time: string;
      content: string;
   } | null;

   constructor(options: ChatResponse) {
      this.id = options.id;
      this.title = options.title;
      this.avatar = options.avatar;
      this.unread_count = options.unread_count;

      if (options.last_message !== null) {
         this.last_message = {
            time: options.last_message.time,
            content: options.last_message.content,
            user: new User(options.last_message.user),
         };
      } else {
         this.last_message = null;
      }
   }
}
