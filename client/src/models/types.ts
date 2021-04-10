import { DateCustom } from "../utils/date";

export type TUser = {
   login: string;
   email: string;
   first_name: string;
   last_name: string;
   display_name: string;
   avatar?: string;
   password?: string;
};

export type TMessage = {
   time: string | DateCustom;
   user: string;
   type: "text" | "attachment";
   unread: boolean;
   content: string;
};

export type TChat = {
   user: TUser;
   data: {
      messages: TMessage[] | [];
   };
};
