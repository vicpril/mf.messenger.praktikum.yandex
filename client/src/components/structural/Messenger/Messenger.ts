import "./Messenger.scss";

import { Block } from "../Block/Block";

import { last } from "../../../utils/pure-functions";
import template from "./Messenger.tmpl";
import { AccountController } from "../../../controllers/AccountController/AccountController";
import { TUser } from "../../../models/User";
import { ChatsController } from "../../../controllers/Chats/ChatsController";
import { MessengerController } from "../../../controllers/Messenger/MessengerController";
import { TMessage } from "../../../models/Message";
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
      "Message:new": async function () {
         await renderMessages.call(this);
      },
   },
   storeSubscribers: {
      accountSettings: function (changes: any) {
         this.props.account = changes;
         this.$emit(this.EVENTS.UPDATE);
      },
      selectedChatId: async function (id: number) {
         new MessengerController(this).fetchMessages(id);
         await renderMessages.call(this, id);
      },
   },
   methods: {},
   async beforePrepare() {
      const P = this.props; // alias
      P.account = AccountController.getAccount();
      new MessengerController(this).fetchMessages(
         ChatsController.getSelectedChatId()
      );

      await renderMessages.call(this);
   },
   async beforeCreate() {
      const P = this.props; // alias
      P.chat = ChatsController.getSelectedChat();
      P.chatId = ChatsController.getSelectedChatId();

      // if (this.rebuild) {
      await new MessengerController(this).connect();
      // }
   },
   afterInit() {
      sctollToButton.call(this);
   },
   beforeDestroy() {
      this.rebuild = true;
      new MessengerController(this).disconnect();
   },
};

function sctollToButton() {
   setTimeout(() => {
      window.scrollTo(0, this.$root.$el.scrollHeight);
   }, 10);
}

async function renderMessages(chatId = this.props.chat.id) {
   await initBlocks.call(this, chatId).then((blocks: IBlock[]) => {
      this.props.blocks = blocks;
      this.$emit(this.EVENTS.UPDATE);
   });
}

async function initBlocks(chatId = this.props.chat.id): Promise<IBlock[]> {
   const blocks = [] as IBlock[];
   const messages = await new MessengerController(this).getChatMessages(chatId);
   await messages.forEach(async (message) => {
      await addMessageToBlocks(message, blocks);
   });
   return blocks;
}

async function addMessageToBlocks(message: TMessage, blocks: IBlock[] = []) {
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
