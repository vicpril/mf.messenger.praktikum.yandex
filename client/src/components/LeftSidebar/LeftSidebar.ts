import "./LeftSidebar.scss";

import { Chat } from "../Chat/Chat";
import { ChatAccount } from "../ChatAccount/ChatAccount";
import template from "./LeftSidebar.tmpl";

export const LeftSidebar = {
   name: "LeftSidebar",
   template: template,
   components: [ChatAccount, Chat],
   props: {},
   methods: {},
   listeners: [],
   subscribers: {},
};
