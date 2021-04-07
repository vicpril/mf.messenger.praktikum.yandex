import { TemplatorIf } from "./templator-if";
import { TemplatorFor } from "./templator-for";
import { TemplatorVariables } from "./templator-variables";

export class Templator {
   constructor(private template: string) {}

   compile(context: Object) {
      const templatorFor = new TemplatorFor(this.template);
      this.template = templatorFor.compile(context);
      const templatorIf = new TemplatorIf(this.template);
      this.template = templatorIf.compile(context);
      const templatorVariables = new TemplatorVariables(this.template);
      this.template = templatorVariables.compile(context);
      return this.template;
   }
}
