import account = require("../models/modelAccount.json");
import chats = require("../models/modelChats.json");

import { TChat, TUser } from "../models/types";

export class AppService {
   static getChats(): TChat[] {
      return chats as TChat[];
   }

   static getAccount(): TUser {
      return account;
   }
}
