import "./Messager.scss";

import { TChat, TMessage, TUser } from "../../models/types";

import { AppService } from "../../services/AppService";
import { isEmpty } from "../../utils/isEmpty";
import { isUndefined } from "../../utils/pure-functions";
import template from "./Messager.tmpl";

export const Messager = {
   name: "Messager",
   template: template,
   components: [],
   props: {
      chat: {},
      account: AppService.getAccount(),
      blocks: [],
   },
   listeners: [],
   subscribers: {},
   methods: {},

   beforeCreate() {
      this.props.blocks = [
         ...buildBlocksHistory(this.props.chat, this.props.account),
      ];
   },
};

export type TBlock = {
   type: "date" | "message";
   content: any;
};
export type TBlockDate = TBlock & {
   type: "date";
   content: string;
};
export type TBlockMessage = TBlock & {
   type: "message";
   content: {
      user: TUser;
      isForeign: boolean;
      messages: TMessage[];
   };
};

function* buildBlocksHistory(chat: TChat, account: TUser): Iterable<TBlock> {
   const messages = chat.data.messages;
   let i: number = 0;
   let block: TBlock = null;

   while (i < messages.length) {
      let message: TMessage = messages[i];

      // check date - may be create BlockDate
      if (
         isUndefined(messages[i - 1]) ||
         new Date(+message.time).toLocaleDateString() !==
            new Date(+messages[i - 1].time).toLocaleDateString()
      ) {
         let dateTime = new Date(+message.time);
         block = {
            type: "date",
            content: dateTime.toLocaleDateString(),
         };
         yield block as TBlockDate;
         block = createBlockUserMessages(message.user, chat.user, account);
         yield block as TBlockMessage;
      }

      // create new block
      block =
         block ?? createBlockUserMessages(message.user, chat.user, account);

      if (message.user === block.content.user.login) {
         // add message to list
         block.content.messages.push(message);
      } else {
         //return block & create new
         yield block as TBlockMessage;
         block = createBlockUserMessages(message.user, chat.user, account);
         block.content.messages.push(message);
      }
      i++;
   }
}

function createBlockUserMessages(
   login: string,
   user: TUser,
   account: TUser
): TBlock {
   const isForeign = login !== account.login;
   const currentBlockUser = isForeign ? user : account;
   return {
      type: "message",
      content: { user: currentBlockUser, isForeign: isForeign, messages: [] },
   };
}
