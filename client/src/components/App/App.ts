import "./App.scss";

import { AppService } from "../../services/AppService";
import { LeftSidebar } from "../LeftSidebar/LeftSidebar";
import { MainWindow } from "../MainWindow/MainWindow";
import template from "./App.tmpl";

export const App = {
   name: "App",
   template: template,
   components: [LeftSidebar, MainWindow],
   props: {
      account: AppService.getAccount(),
      chats: AppService.getChats(),
   },
   // listeners: [],
   // subscribers: {},
   // methods: {},
   // afterInit() {},
};
