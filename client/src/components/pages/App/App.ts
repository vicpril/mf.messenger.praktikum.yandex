import "./App.scss";

import { LeftSidebar } from "../../structural/LeftSidebar/LeftSidebar";
import { MainWindow } from "../../structural/MainWindow/MainWindow";
import template from "./App.tmpl";
import { HideLoader, ShowLoader } from "../../../core/loader/loader";
import { ModalNewChat } from "../../structural/ModalNewChat/ModalNewChat";
import {
   HideLeftSidebarLoader,
   ShowLeftSidebarLoader,
} from "../../../controllers/LeftSidebar/LeftSidebarLoader/LeftSidebarLoader";

export const App = {
   name: "App",
   template: template,
   components: [LeftSidebar, MainWindow, ModalNewChat],
   props: {},
   subscribers: {},
   afterInit() {
      window.ShowLoader = ShowLoader();
      window.HideLoader = HideLoader;
      window.ShowLeftSidebarLoader = ShowLeftSidebarLoader();
      window.HideLeftSidebarLoader = HideLeftSidebarLoader;
   },
};
