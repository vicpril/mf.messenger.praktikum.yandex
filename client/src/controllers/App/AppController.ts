import { App } from "../../components/pages/App/App";
import { ErrorPage404 } from "../../components/pages/ErrorPage/404";
import { ErrorPage500 } from "../../components/pages/ErrorPage/500";
import { rootReducer } from "../../core/store/rootReducer";
import { createStore } from "../../core/store/Store";

export class AppController {
   static index() {
      const { session } = createStore(rootReducer).getState();
      console.log("~ session", session);
      return App;
   }

   static error404() {
      return ErrorPage404;
   }
   static error500() {
      return ErrorPage500;
   }
}
