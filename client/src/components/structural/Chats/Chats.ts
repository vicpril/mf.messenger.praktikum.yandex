import "./Chats.scss";

import { Chat } from "../Chat/Chat";
import { TChat } from "../../../models/types";
import { strContains } from "../../../utils/pure-functions";
import template from "./Chats.tmpl";

export const Chats = {
   name: "Chats",
   template: template,
   components: [Chat],
   props: { chats: [], chatsFiltered: [] },
   listeners: [],
   methods: {},
   subscribers: {
      "ChatSearch:input": function (s: string) {
         this.props.chatsFiltered = this.props.chats.filter((chat: TChat) =>
            strContains(s, chat.user.display_name, false)
         );
         this.$emit(this.EVENTS.UPDATE);
      },
   },
   beforePrepare() {
      this.props.chatsFiltered = this.props.chats;
   },
   afterInit() {
      window.chats = this;
      window.emmiter = this.emmiter;
   },
};
