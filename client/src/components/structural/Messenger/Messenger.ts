import "./Messenger.scss";

import { Block } from "../Block/Block";

import { isUndefined, last } from "../../../utils/pure-functions";
import { sortByTime } from "../../../utils/sortMessages";
import template from "./Messenger.tmpl";
import { AccountController } from "../../../controllers/AccountController/AccountController";
import { TChat } from "../../../models/Chat";
import { TUser } from "../../../models/User";
import { ChatsController } from "../../../controllers/Chats/ChatsController";
import { MessengerController } from "../../../controllers/Messenger/MessengerController";
import { MessageTypes, TMessage } from "../../../models/Message";
import { IBlock } from "../Block/BlockInterface";
import { BlockMessages } from "../Block/BlockMessages";
import { BlockDate, isSameDayBlocks } from "../Block/BlockDate";
import { UsersController } from "../../../controllers/Users/UsersController";

export const Messenger = {
   name: "Messenger",
   template: template,
   components: [Block],
   props: {
      chat: {},
      account: {},
      blocks: [] as Partial<IBlock>,
   },
   listeners: [],
   subscribers: {
      "App:afterInit": function () {
         sctollToButton.call(this);
      },
      "Message:new": function (_: any, message: TMessage) {
         if (message.type === MessageTypes.MESSAGE) {
            renderMessage.call(this, message);
         }
      },
      "Chat:selected": function () {
         this.props.blocks = [];
         this.$emit(this.EVENTS.UPDATE);
      },
   },
   storeSubscribers: {
      selectedChatId: function () {
         this.$emit(this.EVENTS.UPDATE);
      },
      accountSettings: function (changes: any) {
         this.props.account = changes;
         this.$emit(this.EVENTS.UPDATE);
      },
   },
   methods: {},
   beforePrepare() {
      const P = this.props; // alias
      P.account = AccountController.getAccount();
      this.props.blocks = [];
   },
   beforeCreate() {
      const P = this.props; // alias
      P.chat = ChatsController.getSelectedChat();
      P.chatId = ChatsController.getSelectedChatId();

      new MessengerController(this).connect();
   },
   afterInit() {
      sctollToButton.call(this);
   },
};

function sctollToButton() {
   setTimeout(() => {
      window.scrollTo(0, this.$root.$el.scrollHeight);
   }, 10);
}

async function renderMessage(message: TMessage) {
   await addMessageToBlock.call(this, message);
   this.$emit(this.EVENTS.UPDATE);
}

async function addMessageToBlock(message: TMessage) {
   const blocks = this.props.blocks as IBlock[];
   const owner = await UsersController.get(message.user_id);
   const account = (await AccountController.getAccount()) as TUser;
   if (owner && account) {
      if (blocks.length === 0) {
         // create new block date
         const blockDate = new BlockDate(message.time);
         blocks.push(blockDate);
         // create new block message
         const blockMessages = new BlockMessages(owner, account);
         blockMessages.addMessage(message);
         blocks.push(blockMessages);
         return;
      }

      if ((last(blocks) as BlockMessages).content.user.id !== message.user_id) {
         // MAYBE create new block date
         const blockDate = new BlockDate(message.time);
         const lastBlock = last(blocks) as BlockMessages;
         const prevDate = new BlockDate(
            lastBlock.getLastMessageTime() as string
         );
         if (!isSameDayBlocks(blockDate, prevDate)) {
            blocks.push(blockDate);
         }
         // create new block message
         const blockMessages = new BlockMessages(owner, account);
         blockMessages.addMessage(message);
         blocks.push(blockMessages);
         return;
      }

      (last(blocks) as BlockMessages).addMessage(message);
   }
}

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
         yield block as TBlockMessages;
      }

      // create new block
      block =
         block ?? createBlockUserMessages(message.user, chat.user, account);

      if (message.user === block.content.user.login) {
         // add message to list
         block.content.messages.push(message);
      } else {
         // return block & create new
         yield block as TBlockMessages;
         block = createBlockUserMessages(message.user, chat.user, account);
         block.content.messages.push(message);
      }
      i++;
   }
}

function createBlockMessages(
   login: string,
   user: TUser,
   account: TUser
): TBlockMessages {
   const isForeign = login !== account.login;
   const currentBlockUser = isForeign ? user : account;
   return {
      type: "message",
      content: { user: currentBlockUser, isforeign: isForeign, messages: [] },
   };
}
