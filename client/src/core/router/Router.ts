import { $, TDomAbstraction } from "../../utils/dom-abstraction";
import { ActiveRoute } from "./ActiveRoute";

export class Router {
   private static instance: Router | null = null;
   private routes = [];
   private history = window.history;
   private currentRoute = null;
   $placeholder: TDomAbstraction;

   constructor(selector: string) {
      if (Router.instance) {
         return Router.instance;
      }

      if (!selector) {
         throw new Error("Selector is not provided in Router");
      }

      this.$placeholder = $(selector);

      this.changePageHandler = this.changePageHandler.bind(this);

      this.init();
   }

   private changePageHandler() {
      this.$placeholder.html(ActiveRoute.path);
   }

   private init() {
      window.addEventListener("hashchange", this.changePageHandler);
      this.changePageHandler();
   }

   destroy() {
      window.removeEventListener("hashchange", this.changePageHandler);
   }

   // go(pathname) {
   //    this.history.pushState({}, "", pathname);
   //    this.changePageHandler;
   // }
}
