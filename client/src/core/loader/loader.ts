import { $, TDomAbstraction } from "../../utils/dom-abstraction";
import template from "./loader.tmpl";
import "./loader.scss";

class Loader {
   static __instance: Loader;

   $loader: TDomAbstraction;
   $title: TDomAbstraction;

   constructor() {
      if (Loader.__instance) {
         return Loader.__instance;
      }

      this.$loader = $.create("div", "loader");
      this.$loader.html(template);

      Loader.__instance = this;

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

export function LoaderInit(): Loader {
   return new Loader();
}

export function ShowLoader(text: string = "Loading..."): () => void {
   return function () {
      new Loader().setTitle(text).show();
   };
}

export function HideLoader(): void {
   new Loader().hide();
}
