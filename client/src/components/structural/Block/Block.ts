import "./Block.scss";

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
      if (B.type === "messages") {
         B.content.messages = B.content.messages.map(mapMessageDateCustom);
      }
   },
};
