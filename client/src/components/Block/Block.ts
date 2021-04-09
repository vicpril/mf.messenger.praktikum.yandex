import "./Block.scss";

import { TMessage, TUser } from "../../models/types";

import { Avatar } from "../Avatar/Avatar";
import { mapMessageDateCustom } from "../../utils/date";
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

export type TBlock = {
   type: "date" | "message";
   content: any;
};
export type TBlockDate = TBlock & {
   type: "date";
   content: string;
};
export type TBlockMessage = TBlock & {
   type: "message";
   content: {
      user: TUser;
      isforeign: boolean;
      messages: TMessage[];
   };
};
