import { Component } from "../../core/Component";
import template from "./LeftSidebar.tmpl";

export const LeftSidebar = {
   name: "leftsidebar",
   template: template,
   components: [],
   props: {},
   methods: {
      onClick(event: Event & { target: Element }) {
         if (!event.target.classList.contains("button")) return;
         console.log(`click from ${this.name}`);
         this.$emit("LSclick", { test: "test" }, { second: 123 });
      },
   },
   listeners: ["click"],
   subscribers: {},
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
      window.leftsidebar = this;
   },
};
