import "./Block.scss";

import { Avatar } from "../Avatar/Avatar";
import { mapMessageDateCustom } from "../../../utils/date";
import template from "./Block.tmpl";
import { TUser } from "../../../models/User";
import { TMessage } from "../../../models/Message";

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
