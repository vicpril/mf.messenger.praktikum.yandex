import { get } from "/utils/mydash/get";
import { getUniqueStr } from "/utils/mydash/getUniqueStr";

export class TemplatorVariables {
   TEMPLATE_REGEXP = /\{\{(.*?)\}\}/i;

   constructor(template) {
      this._template = template;
   }

   compile(ctx) {
      return this._compileTemplate(ctx);
   }

   _compileTemplate(ctx) {
      let template = this._template;
      const regExp = this.TEMPLATE_REGEXP; // avoid from infinity loop
      let key = null;
      while ((key = regExp.exec(template))) {
         if (key[1]) {
            const templValue = key[1].trim();
            const value = get(ctx, templValue);

            // check if value defined
            if (typeof value === 'undefined') {
               template = template.replace(new RegExp(key[0], "gi"), "");
               continue;
            }

            // handle function
            if (typeof value === 'function') {
               const salt = "_" + getUniqueStr();
               window[templValue + salt] = value;
               template = template.replace(
                  new RegExp(key[0], "gi"),
                  `window.${key[1].trim()}${salt}()`
               )
               continue;
            }

            template = template.replace(new RegExp(key[0], "gi"), value);
         }
      }

      return template;
   }
}