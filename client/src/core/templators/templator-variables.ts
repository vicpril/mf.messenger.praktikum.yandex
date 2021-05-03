import { v4 as uuidv4 } from "uuid";
import { IContext } from "./templatorInterface";
import { get } from "../../utils/pure-functions";
import { htmlspecialchars } from "../../utils/htmlspecialchars";

declare global {
   interface Window {
      [key: string]: any;
   }
}
export class TemplatorVariables {
   TEMPLATE_REGEXP = /\{\{(.*?)\}\}/i;

   constructor(private template: string) {}

   compile(context: IContext) {
      return this._compileTemplate(context);
   }

   _compileTemplate(context: IContext) {
      let { template } = this;
      const regExp = this.TEMPLATE_REGEXP; // avoid from infinity loop
      let key = null;
      while ((key = regExp.exec(template))) {
         if (key[1]) {
            const templValue: string = key[1].trim() as string;
            const value: any = get(context, templValue);

            // check if value defined
            if (typeof value === "undefined") {
               template = template.replace(new RegExp(key[0], "gi"), "");
               continue;
            }

            // handle function
            if (typeof value === "function") {
               const salt: string = `_${uuidv4()}`;
               window[templValue + salt] = "value";
               template = template.replace(
                  new RegExp(key[0], "gi"),
                  `window.${key[1].trim()}${salt}()`
               );
               continue;
            }

            // handle object
            if (typeof value === "object") {
               template = template.replace(
                  new RegExp(key[0], "gi"),
                  JSON.stringify(value, null, 2)
               );
               continue;
            }

            template = template.replace(
               new RegExp(key[0], "gi"),
               htmlspecialchars(value)
            );
         }
      }

      return template;
   }
}
