import { $, TDomAbstraction } from "../../../utils/dom-abstraction";
import template from "./LeftSidebarLoader.tmpl";
import "./LeftSidebarLoader.scss";

class LeftSidebarLoader {
   static __instance: LeftSidebarLoader;

   $loader: TDomAbstraction;
   $title: TDomAbstraction;

   constructor() {
      if (LeftSidebarLoader.__instance) {
         return LeftSidebarLoader.__instance;
      }

      this.$loader = $.create("div", "loader_LeftSidebarLoader");
      this.$loader.html(template);

      LeftSidebarLoader.__instance = this;

      this.init();
   }

   show() {
      this.$loader.addClass("show");
   }

   hide() {
      this.$loader.removeClass("show");
   }

   private init() {
      this.$title = $.create("span", "loader_title");
      this.$loader.append(this.$title);
      $("body").append(this.$loader);
      return this;
   }

   setTitle(text: string) {
      this.$title.text(text);
      return this;
   }

   remove() {
      this.hide();
      this.$loader.remove();
   }
}

export function LeftSidebarLoaderInit(): LeftSidebarLoader {
   return new LeftSidebarLoader();
}

export function ShowLeftSidebarLoader(text: string = "Loading..."): () => void {
   return function () {
      new LeftSidebarLoader().setTitle(text).show();
   };
}

export function HideLeftSidebarLoader(): void {
   new LeftSidebarLoader().hide();
}
