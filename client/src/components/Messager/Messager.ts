import "./Messager.scss";

import { Block, TBlock, TBlockDate, TBlockMessage } from "../Block/Block";
import { TChat, TMessage, TUser } from "../../models/types";

import { AppService } from "../../services/AppService";
import { isUndefined } from "../../utils/pure-functions";
import { sortByTime } from "../../utils/sortMessages";
import template from "./Messager.tmpl";

export const Messager = {
   name: "Messager",
   template: template,
   components: [Block],
   props: {
      chat: {},
      account: AppService.getAccount(),
      blocks: [],
   },
   listeners: [],
   subscribers: {
      "App:afterInit": function () {
         setTimeout(() => {
            window.scrollTo(0, this.$root.$el.scrollHeight);
         }, 10);
      },
   },
   methods: {},

   beforeCreate() {
      this.props.blocks = [
         ...buildBlocksHistory(this.props.chat, this.props.account),
      ];
   },
};

function* buildBlocksHistory(chat: TChat, account: TUser): Iterable<TBlock> {
   const messages = sortByTime(chat.data.messages, "asc");
   let i: number = 0;
   let block: Partial<TBlock> = {};

   while (i < messages.length) {
      const message: TMessage = messages[i];

      // check date - may be create BlockDate
      if (
         isUndefined(messages[i - 1]) ||
         new Date(+message.time).toLocaleDateString() !==
            new Date(+messages[i - 1].time).toLocaleDateString()
      ) {
         const dateTime = new Date(+message.time);
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
         // return block & create new
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
      content: { user: currentBlockUser, isforeign: isForeign, messages: [] },
   };
}
