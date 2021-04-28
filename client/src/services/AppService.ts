import { TChat, TUser } from "../models/types";
import { first } from "../utils/pure-functions";
import { ActiveRoute } from "../core/router/ActiveRoute";

import account = require("../models/modelAccount.json");
import chats = require("../models/modelChats.json");

export class AppService {
   static getChats(): TChat[] {
      return chats as TChat[];
   }

   static getAccount(): TUser {
      return account;
   }

   static getSelectedChat(): TChat | null {
      const userlogin = ActiveRoute.param ?? undefined;
      if (!userlogin) {
         return null;
      }
      const chat: TChat = first(
         AppService.getChats().filter(
            (chat: TChat) => chat.user.login === userlogin
         )
      );

      return chat || null;
   }

   static getChatInfo(userlogin?: string): TChat | null {
      if (!userlogin) {
         userlogin = ActiveRoute.param ?? undefined;
         // userlogin = getUrlParameter("info") ?? undefined;
      }
      if (!userlogin) {
         return null;
      }
      const chat: TChat = first(
         AppService.getChats().filter(
            (chat: TChat) => chat.user.login === userlogin
         )
      );
      return chat || null;
   }
}
