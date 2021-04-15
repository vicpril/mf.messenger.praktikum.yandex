import "./Block.scss";

import { TMessage, TUser } from "../../../models/types";

import { Avatar } from "../Avatar/Avatar";
import { mapMessageDateCustom } from "../../../utils/date";
import template from "./Block.tmpl";

export const Block = {
   name: "Block",
   template: template,
   components: [Avatar],
   props: {
      block: {},
   },
   listeners: [],
   subscribers: {},
   methods: {},
   beforeCreate() {
      const B = this.props.block; // alias
      if (B.type === "message") {
         B.content.messages = B.content.messages.map(mapMessageDateCustom);
      }
   },
};

export interface TBlock {
   type: "date" | "message";
   content: any;
}
export interface TBlockDate extends TBlock {
   type: "date";
   content: string;
}
export interface TBlockMessage extends TBlock {
   type: "message";
   content: {
      user: TUser;
      isforeign: boolean;
      messages: TMessage[];
   };
}
