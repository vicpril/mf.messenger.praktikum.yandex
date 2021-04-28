import { $, TDomAbstraction } from "../../utils/dom-abstraction";
import { isEmpty } from "../../utils/isEmpty";
import { trim } from "../../utils/pure-functions";
import { IIngredients } from "../ComponentInterfaces";
import { LoaderInit } from "../loader/loader";
import { Store } from "../store/Store";
// eslint-disable-next-line import/no-cycle
import { Route } from "./Route";

export class Router {
   static getRouter() {
      return new Router();
   }

   private static __instance: Router | null = null;
   private routes = new Map();
   private history = window.history;
   private currentRoute: Route;
   $placeholder: TDomAbstraction;

   constructor() {
      if (Router.__instance) {
         return Router.__instance;
      }

      this.changePageHandler = this.changePageHandler.bind(this);

      Router.__instance = this;
   }

   init(selector: string) {
      this.$placeholder = $(selector);

      window.addEventListener(
         "popstate",
         (event: Event & { target: Window }) => {
            this.changePageHandler(event.target.location.pathname);
         }
      );
      const { pathname } = window.location;

      if (this.isAuthRedirect(pathname)) {
         return;
      }

      this.changePageHandler(window.location.pathname);

      LoaderInit();
   }

   private isAuthRedirect(pathname: string): boolean {
      const authPages = ["signin", "signup"];

      const { session } = Store.get().getState();
      const routname = this.getRouteName(pathname);
      if (!isEmpty(session) || session?.login) {
         if (authPages.includes(routname)) {
            Router.navigate("chats");
            return true;
         }
      } else if (!authPages.includes(routname)) {
         Router.navigate("signin");
         return true;
      }

      if (pathname === "/") {
         Router.navigate("chats");
         return true;
      }
      return false;
   }

   private changePageHandler(pathname: string) {
      let route = this.getRoute(pathname);
      if (!route) {
         route = this.getRoute("404");
      }

      if (this.currentRoute) {
         this.currentRoute.leave();
         this.$placeholder.html("");
      }

      this.currentRoute = route;
      route.render(this.$placeholder);
   }

   use(pathname: string, options: IIngredients) {
      if (pathname.charAt(0) !== "/") {
         pathname = `/${pathname}`;
      }
      this.routes.set(pathname, new Route(pathname, options));
      return this;
   }

   back() {
      this.history.back();
      return false;
   }

   forward() {
      this.history.forward();
      return false;
   }

   destroy() {
      if (this.currentRoute) {
         this.currentRoute.leave();
      }
      this.$placeholder.off("popstate", this.changePageHandler);
   }

   navigate(pathname: string, param: string = "") {
      if (pathname.charAt(0) !== "/") {
         pathname = `/${pathname}`;
      }
      if (param) {
         pathname = `${pathname}/${param}`;
      }

      this.history.pushState({}, "", `${pathname}`);
      this.changePageHandler(pathname);
      return false;
   }

   static navigate(pathname: string, param = "") {
      Router.getRouter().navigate(pathname, param);
   }
   static back() {
      Router.getRouter().back();
   }
   static forward() {
      Router.getRouter().forward();
   }

   getRoute(pathname: string): Route {
      const routname = this.getRouteName(pathname);
      return this.routes.get(`/${routname}`);
   }

   getRouteName(pathname: string): string {
      return trim(pathname, "/").split("/")[0];
   }
}
