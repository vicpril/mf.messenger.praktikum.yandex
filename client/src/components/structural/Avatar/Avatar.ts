import "./Avatar.scss";
// @ts-ignore: Unreachable code error
import unknownAvatar from "../../../assets/unknown_avatar.png";

import { strToColor } from "../../../utils/pure-functions";
import template from "./Avatar.tmpl";
import { ResourcesAPI } from "../../../core/xhr/ResourcesAPI";

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
      const { avatar } = this.props.user;
      let url = "";
      if (avatar) {
         if (avatar.startsWith("/")) {
            url = new ResourcesAPI().getResourceURL(avatar);
         } else {
            url = avatar;
         }
      } else {
         url = unknownAvatar;
      }
      this.props.avatar = url;
   },
   beforeCreate() {
      if (!this.props.user) {
         throw new Error("Avatar: User is not implemented");
      }
      this.props.borderColor = strToColor(this.props.user.avatar);
   },
};
