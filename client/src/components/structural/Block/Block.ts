import "./Block.scss";

import { Avatar } from "../Avatar/Avatar";
import { DateCustom } from "../../../utils/date";
import template from "./Block.tmpl";
import { MessageTypes, TMessage } from "../../../models/Message";
import { ResourcesAPI } from "../../../core/xhr/ResourcesAPI";
import { cloneDeep } from "../../../utils/cloneDeep";
import { Message } from "../Message/Message";

export const Block = {
   name: "Block",
   template: template,
   components: [Avatar, Message],
   props: {
      block: {},
   },
   listeners: [],
   subscribers: {},
   methods: {},
   beforeCreate() {
      // const B = this.props.block; // alias
      // if (B.type === "messages") {
      //    B.content.messages = cloneDeep(B.content.messages).map(
      //       prepareMessages
      //    );
      // }
   },
};

// function prepareMessages(message: TMessage) {
//    message.date = new DateCustom(+Date.parse(message.time));
//    switch (message.type) {
//       case MessageTypes.FILE:
//          if (message.file) {
//             const url = new ResourcesAPI().getResourceURL(message.file?.path);
//             message.content = `<img class="message_file" src="${url}"></img>`;
//          }
//          break;
//       case MessageTypes.MESSAGE:
//       default:
//          message.content = `<span class="message_text">${message.content}</span>`;
//          break;
//    }
//    return message;
// }
