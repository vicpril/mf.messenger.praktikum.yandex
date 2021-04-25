import { $, TDomAbstraction } from "../../utils/dom-abstraction";
import { PageComponent } from "../PageComponent";
import { ActiveRoute } from "./ActiveRoute";
import { Route } from "./Route";

export class Router {
   private static instance: Router | null = null;
   private routes: Route[] = [];
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

      // this.init();
   }

   private changePageHandler(pathname: string = "") {
      // this.$placeholder.html(ActiveRoute.path);
      const route = this.getRoute(pathname);
      if (!route) {
         return;
      }

      // if (this._currentRoute) {
      //   this._currentRoute.leave();
      // }

      route.render(this.$placeholder);
   }

   init() {
      window.addEventListener("hashchange", this.changePageHandler);
      this.changePageHandler();
   }

   use(pathname: string, page: PageComponent) {
      this.routes.push(new Route(pathname, page));
   }

   destroy() {
      window.removeEventListener("hashchange", this.changePageHandler);
   }

   // go(pathname) {
   //    this.history.pushState({}, "", pathname);
   //    this.changePageHandler;
   // }

   getRoute(pathname: string) {
      return this.routes.find((route) => route.match(pathname));
   }
}
