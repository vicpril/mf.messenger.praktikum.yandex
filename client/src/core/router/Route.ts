import { TDomAbstraction } from "../../utils/dom-abstraction";
import { PageComponent } from "../PageComponent";

export class Route {
   constructor(private pathname: string, private page: PageComponent) {}

   navigate(pathname: string) {
      if (this.match(pathname)) {
         this.pathname = pathname;
         // this.render();
      }
   }

   leave() {
      // if (!this.page) {
      //    return;
      // }
      // this.page.hide();
   }

   match(pathname: string) {
      return pathname === this.pathname;
   }

   render($placeholder: TDomAbstraction) {
      // if (!this._block) {
      //    this._block = new this._blockClass();
      //    render(this._props.rootQuery, this._block);
      //    return;
      // }
      // this._block.show();
      $placeholder.append(this.page.getRoot());

      this.page.afterRender();
   }
}
