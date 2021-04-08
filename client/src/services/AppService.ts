import account = require("../models/modelAccount.json");
import chats = require("../models/modelChats.json");

import { TChat, TUser } from "../models/types";
import { first, getUrlParameter } from "../utils/pure-functions";

export class AppService {
   static getChats(): TChat[] {
      return chats as TChat[];
   }

   static getAccount(): TUser {
      return account;
   }

   static getSelectedUser(): string | null {
      const userlogin = getUrlParameter("user");
      if (!userlogin) {
         return null;
      }
      const user: TUser = first(
         AppService.getChats().filter(
            (chat: TChat) => chat.user.login === userlogin
         )
      ).user;
      return user ? user.login : null;
   }
}
