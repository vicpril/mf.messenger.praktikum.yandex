import "./LeftSidebar.scss";

import { ChatAccount } from "../ChatAccount/ChatAccount";
import { ChatSearch } from "../ChatSearch/ChatSearch";
import { Chats } from "../Chats/Chats";
import template from "./LeftSidebar.tmpl";

export const LeftSidebar = {
   name: "LeftSidebar",
   template: template,
   components: [ChatAccount, Chats, ChatSearch],
   props: {
      chats: [],
   },
   methods: {},
   listeners: [],
};
