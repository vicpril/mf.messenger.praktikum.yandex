import { App } from "../../components/pages/App/App";
import { PageComponent } from "../../core/PageComponent";

export class AppController {
   static index() {
      return new PageComponent(App);
   }
}
