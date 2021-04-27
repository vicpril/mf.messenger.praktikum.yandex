import "./Avatar.scss";
// @ts-ignore: Unreachable code error
import avatar from "../../../assets/unknown_avatar.png";

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
   beforePrepare() {
      this.props.avatar = this.props.user.avatar ?? avatar;
   },
   beforeCreate() {
      if (!this.props.user) {
         throw new Error("Avatar: User is not implemented");
      }
      this.props.borderColor = strToColor(this.props.user.avatar);
   },
};
