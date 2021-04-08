import { LeftSidebar } from "../LeftSidebar/LeftSidebar";
import template from "./App.tmpl";

export const App = {
   name: "app",
   template: template,
   components: [LeftSidebar],
   props: {
      test: "testProp123",
   },
   listeners: [],
   subscribers: {
      LSclick: (...args) => {
         console.log("App is listening: LSclick", "params:", ...args);
      },
   },
   methods: {},
   beforeCreate() {
      console.log("beforeCreate", this.name);
   },
   beforeMount() {
      console.log("beforeMount", this.name);
   },
   beforeInit() {
      console.log("beforeInit", this.name);
   },
   afterInit() {
      console.log("afterInit", this.name);
   },
};
