import "./LeftSidebar.scss";

import { ChatAccount } from "../ChatAccount/ChatAccount";
import { ChatSearch } from "../ChatSearch/ChatSearch";
import { Chats } from "../Chats/Chats";
import template from "./LeftSidebar.tmpl";
import { ChatsMenu } from "../ChatsMenu/ChatsMenu";
import { ChatFilter } from "../ChatFilter/ChatFilter";

export const LeftSidebar = {
   name: "LeftSidebar",
   template: template,
   components: [ChatAccount, Chats, ChatFilter, ChatSearch, ChatsMenu],
   props: {
      chats: [],
   },
   methods: {},
   listeners: [],
};
