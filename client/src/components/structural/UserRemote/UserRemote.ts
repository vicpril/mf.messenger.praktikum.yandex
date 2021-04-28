import "./UserRemote.scss";

import { Avatar } from "../Avatar/Avatar";
import template from "./UserRemote.tmpl";

export const UserRemote = {
   name: "UserRemote",
   template: template,
   components: [Avatar],
   props: {
      user: {},
   },
   listeners: ["click"],
   subscribers: {},
   methods: {
      onClick(e: Event & { target: Element }): void {},
   },
   beforePrepare() {
      this.name = `${this.name}_${this.props.user.login}`;
   },
   beforeCreate() {},
};
