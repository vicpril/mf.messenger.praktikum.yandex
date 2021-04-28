import "./App.scss";

import { AppService } from "../../../services/AppService";
import { LeftSidebar } from "../../structural/LeftSidebar/LeftSidebar";
import { MainWindow } from "../../structural/MainWindow/MainWindow";
import template from "./App.tmpl";
import { HideLoader, ShowLoader } from "../../../core/loader/loader";

export const App = {
   name: "App",
   template: template,
   components: [LeftSidebar, MainWindow],
   props: {
      account: AppService.getAccount(),
      chats: AppService.getChats(),
   },
   // afterInit() {
   //    window.showLoader = ShowLoader();
   //    window.hideLoader = HideLoader;
   // },
};
