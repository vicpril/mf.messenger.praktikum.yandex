import "./MainWindow.scss";

import { AppService } from "../../services/AppService";
import { Messager } from "../Messager/Messager";
import { MessagerMenu } from "../MessagerMenu/MessagerMenu";
import { isEmpty } from "../../utils/isEmpty";
import template from "./MainWindow.tmpl";

export const MainWindow = {
   name: "MainWindow",
   template: template,
   components: [Messager, MessagerMenu],
   props: {
      chat: AppService.getSelectedChat(),
   },
   listeners: [],
   subscribers: {},
   methods: {},
   beforePrepare() {
      this.props.is_selected = !isEmpty(this.props.chat);
   },
};
