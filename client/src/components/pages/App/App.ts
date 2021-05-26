import "./App.scss";

import { LeftSidebar } from "../../structural/LeftSidebar/LeftSidebar";
import { MainWindow } from "../../structural/MainWindow/MainWindow";
import template from "./App.tmpl";
import { ModalNewChat } from "../../structural/ModalNewChat/ModalNewChat";
import { Store } from "../../../core/store/Store";

export const App = {
   name: "App",
   template: template,
   components: [LeftSidebar, MainWindow, ModalNewChat],
   props: {
      pagename: "chats",
   },
   subscribers: {},
   storeSubscribers: {
      theme: function (theme: "light" | "dark") {
         setTheme(theme);
      },
   },
   beforeCreate() {
      const theme = Store.get().getState().theme || "light";
      setTheme(theme);
   },
};

function setTheme(theme: "light" | "dark"): void {
   trans();
   document.body.setAttribute("data-theme", theme);
}

let trans = () => {
   document.documentElement.classList.add("transition");
   window.setTimeout(() => {
      document.documentElement.classList.remove("transition");
   }, 1000);
};
