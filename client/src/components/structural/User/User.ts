import "./User.scss";

import { Avatar } from "../Avatar/Avatar";
import template from "./User.tmpl";
import * as actions from "../../../core/store/actions";

export const User = {
   name: "User",
   template: template,
   components: [Avatar],
   props: {
      user: {},
   },
   listeners: ["click"],
   subscribers: {},
   methods: {
      onClick(e: Event & { target: Element }): void {
         // Click on active Avatar
      },
   },
   beforePrepare() {
      this.name = `${this.name}_${this.props.user.id}`;
   },
};
