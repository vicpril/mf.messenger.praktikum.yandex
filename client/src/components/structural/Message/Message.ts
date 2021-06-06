import "./Message.scss";

import { DateCustom } from "../../../utils/date";
import template from "./Message.tmpl";
import { MessageTypes, TMessage } from "../../../models/Message";
import { ResourcesAPI } from "../../../core/xhr/ResourcesAPI";
import { cloneDeep } from "../../../utils/cloneDeep";

export const Message = {
   name: "Message",
   template: template,
   components: [],
   props: {
      message: {},
      type: "",
      types: {
         message: MessageTypes.MESSAGE,
         file: MessageTypes.FILE,
      },
   },
   listeners: [],
   subscribers: {},
   methods: {},
   beforePrepare() {
      this.props.m = prepareMessage(this.props.message);
      if (this.props.m.type === MessageTypes.FILE) {
         if (this.props.m.file) {
            this.props.fileurl = new ResourcesAPI().getResourceURL(
               this.props.m.file?.path
            );
         }
      }
   },
};

function prepareMessage(message: TMessage) {
   message = cloneDeep(message);
   message.date = new DateCustom(+Date.parse(message.time));
   return message;
}
