import "./App.scss";

import { LeftSidebar } from "../../structural/LeftSidebar/LeftSidebar";
import { MainWindow } from "../../structural/MainWindow/MainWindow";
import template from "./App.tmpl";
import { HideLoader, ShowLoader } from "../../../core/loader/loader";

export const App = {
   name: "App",
   template: template,
   components: [LeftSidebar, MainWindow],
   props: {},
   // afterInit() {
   //    window.showLoader = ShowLoader();
   //    window.hideLoader = HideLoader;
   // },
};
