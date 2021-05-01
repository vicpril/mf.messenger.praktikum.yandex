import { App } from "../../components/pages/App/App";
import { ErrorPage404 } from "../../components/pages/ErrorPage/404";
import { ErrorPage500 } from "../../components/pages/ErrorPage/500";
import { IIngredients } from "../../core/ComponentInterfaces";

export class AppController {
   static index() {
      return App as IIngredients;
   }

   static error404() {
      return ErrorPage404;
   }
   static error500() {
      return ErrorPage500;
   }
}
