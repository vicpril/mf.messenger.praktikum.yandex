import "./Avatar.scss";

import { strToColor } from "../../utils/pure-functions";
import template from "./Avatar.tmpl";

export const Avatar = {
   name: "Avatar",
   template: template,
   components: [],
   props: {
      user: {},
      alt: "texttext",
      borderColor: "",
   },
   listeners: [],
   subscribers: {},
   methods: {},
   beforeCreate() {
      this.props.borderColor = strToColor(this.props.user.avatar);
   },
};
