import "./LeftSidebar.scss";

import { ChatAccount } from "../ChatAccount/ChatAccount";
import template from "./LeftSidebar.tmpl";

export const LeftSidebar = {
   name: "LeftSidebar",
   template: template,
   components: [ChatAccount],
   props: {},
   methods: {},
   listeners: [],
   subscribers: {},
};
