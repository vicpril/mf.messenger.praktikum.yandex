import { TMessage } from "../../../models/Message";
import { TUser } from "../../../models/User";
import { last } from "../../../utils/pure-functions";
import { IBlock } from "./BlockInterface";

export class BlockMessages implements IBlock {
   type: "date" | "messages";
   content: {
      user: TUser;
      isforeign: boolean;
      messages: TMessage[];
   };
   constructor(owner: TUser, account: TUser) {
      this.type = "messages";
      this.content = {
         user: owner,
         isforeign: owner.id !== account.id,
         messages: [],
      };
   }

   addMessage(message: TMessage): void {
      this.content.messages.push(message);
   }

   getLastMessageTime(): string | null {
      return last(this.content.messages)?.time ?? null;
   }
}
