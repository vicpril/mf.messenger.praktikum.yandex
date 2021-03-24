import { TemplatorIf } from "./templator-if";
import { TemplatorFor } from "./templator-for";
import { TemplatorVariables } from "./templator-variables";


export class Templator {
   constructor(template) {
      this._template = template;
   }

   compile(ctx) {
      const templatorFor = new TemplatorFor(this._template);
      this._template = templatorFor.compile(ctx);
      const templatorIf = new TemplatorIf(this._template);
      this._template = templatorIf.compile(ctx);
      const templatorVariables = new TemplatorVariables(this._template);
      this._template = templatorVariables.compile(ctx);
      return this._template;
   }

}