import { LeftSidebar } from "../LeftSidebar/LeftSidebar";
import template from "./App.tmpl";

export const App = {
   name: "app",
   template: template,
   components: [LeftSidebar],
   props: {
      test: "testProp",
   },
   listeners: [],
   subscribers: {
      LSclick: (...args) => {
         console.log("App is listening: LSclick", "params:", ...args);
      },
   },
   methods: {},
};
