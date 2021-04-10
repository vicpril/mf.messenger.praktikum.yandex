import "./Avatar.scss";

import { strToColor } from "../../../utils/pure-functions";
import template from "./Avatar.tmpl";

export const Avatar = {
   name: "Avatar",
   template: template,
   components: [],
   props: {
      user: {},
      borderColor: "",
   },
   listeners: [],
   subscribers: {},
   methods: {},
   beforeCreate() {
      if (!this.props.user) {
         throw new Error("Avatar: User is not implemented");
      }
      this.props.borderColor = strToColor(this.props.user.avatar);
   },
};
