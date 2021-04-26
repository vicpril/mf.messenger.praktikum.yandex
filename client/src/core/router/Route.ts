import { TDomAbstraction } from "../../utils/dom-abstraction";
import { IIngredients } from "../ComponentInterfaces";
import { PageComponent } from "../PageComponent";

export class Route {
   private page: PageComponent | null = null;
   constructor(private pathname: string, private options: IIngredients) {}

   leave() {
      if (!this.page) {
         return;
      }
      this.page.destroy();
   }

   match(pathname: string) {
      return pathname === this.pathname;
   }

   render($placeholder: TDomAbstraction) {
      this.page = new PageComponent(this.options);
      $placeholder.append(this.page.getRoot());
      this.page.afterRender();
   }
}
