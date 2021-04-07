import { get } from "../../utils/pure-functions";
import { v4 as uuidv4 } from "uuid";

export class TemplatorVariables {
   TEMPLATE_REGEXP = /\{\{(.*?)\}\}/i;

   constructor(private template: string) {}

   compile(context: Object) {
      return this._compileTemplate(context);
   }

   _compileTemplate(context) {
      let template = this.template;
      const regExp = this.TEMPLATE_REGEXP; // avoid from infinity loop
      let key = null;
      while ((key = regExp.exec(template))) {
         if (key[1]) {
            const templValue: string = key[1].trim();
            const value: any = get(context, templValue);

            // check if value defined
            if (typeof value === "undefined") {
               template = template.replace(new RegExp(key[0], "gi"), "");
               continue;
            }

            // handle function
            if (typeof value === "function") {
               const salt = "_" + uuidv4();
               window[templValue + salt] = value;
               template = template.replace(
                  new RegExp(key[0], "gi"),
                  `window.${key[1].trim()}${salt}()`
               );
               continue;
            }

            template = template.replace(new RegExp(key[0], "gi"), value);
         }
      }

      return template;
   }
}
