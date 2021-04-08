/**
 * <v-for :item :index in array">
 *     {{content}}
 *  <v-for-end>
 *
 *  <v-for :value :key in object">
 *     {{content}}
 *  <v-for-end>
 */

import { TemplatorVariables } from "./templator-variables";
import { get } from "../../utils/pure-functions";

export class TemplatorFor {
   TEMPLATE_REGEXP = /<v-for\s*(:(.*?)\s*:(.*?)\sin\s(.*?))>(.*?)<\/v-for>/gis;

   constructor(private template: string) {}

   compile(context: Object) {
      return this._compileTemplate(context);
   }

   _compileTemplate(context) {
      const regExp = this.TEMPLATE_REGEXP; // avoid from infinity loop
      let template = this.template;
      let result = "";
      let key = null;

      while ((key = regExp.exec(template))) {
         const valueKey = key[2].trim();
         const indexKey = key[3].trim();
         const target = get(context, key[4].trim(), []);
         const content = key[5];
         const templatorVariables = new TemplatorVariables(content);

         if (Array.isArray(target)) {
            target.forEach((value, index) => {
               let context = this.createContext(
                  indexKey,
                  index,
                  valueKey,
                  value
               );
               let contextTemplate = templatorVariables.compile(context);
               result += contextTemplate;
            });
         } else if (typeof target === "object") {
            Object.getOwnPropertyNames(target).forEach((key) => {
               let context = this.createContext(
                  indexKey,
                  key,
                  valueKey,
                  target[key]
               );
               let contextTemplate = templatorVariables.compile(context);
               result += contextTemplate;
            });
         }

         template = template.replace(
            new RegExp(this.escapeRegExp(key[0]), "gis"),
            result
         );
      }

      return template;
   }

   private createContext(indexKey, index, valueKey, value): Object {
      const obj = {};
      obj[indexKey] = index;
      obj[valueKey] = value;
      return obj;
   }

   private escapeRegExp(str: string): string {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
   }
}
