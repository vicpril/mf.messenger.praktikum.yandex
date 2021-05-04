import { ChatResponse } from "../core/xhr/ChatsAPI";
import { isPlainObject } from "../utils/pure-functions";
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

   constructor(options: ChatResponse | Chat) {
      this.id = options.id;
      this.title = options.title;
      this.avatar = options.avatar;
      this.unread_count = options.unread_count;

      if (options.last_message !== null) {
         const obj = isPlainObject(options.last_message)
            ? options.last_message
            : JSON.parse(options.last_message);
         this.last_message = {
            time: obj.time,
            content: obj.content,
            user: new User(obj.user),
         };
      } else {
         this.last_message = null;
      }
   }
}
