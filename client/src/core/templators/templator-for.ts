/* eslint-disable @typescript-eslint/no-loop-func */
/**
 * <v-for :item :index in array">
 *     {{content}}
 *  <v-for-end>
 *
 *  <v-for :value :key in object">
 *     {{content}}
 *  <v-for-end>
 */

import { IContext } from "./templatorInterface";
import { TemplatorVariables } from "./templator-variables";
import { get } from "../../utils/pure-functions";

export class TemplatorFor {
   TEMPLATE_REGEXP = /<v-for\s*(:(.*?)\s*:(.*?)\sin\s(.*?))>(.*?)<\/v-for>/gis;

   constructor(private template: string) {}

   compile(context: IContext) {
      return this._compileTemplate(context);
   }

   _compileTemplate(context: IContext) {
      const regExp = this.TEMPLATE_REGEXP; // avoid from infinity loop
      let { template } = this;
      let result = "";
      let key = null;

      while ((key = regExp.exec(template))) {
         const valueKey = key[2].trim();
         const indexKey = key[3].trim();
         const target = get(context, key[4].trim(), []);
         const content = key[5];
         const templatorVariables = new TemplatorVariables(content);

         if (Array.isArray(target)) {
            target.forEach((value: string, index) => {
               const context = this.createContext(
                  indexKey,
                  index,
                  valueKey,
                  value
               );
               const contextTemplate = templatorVariables.compile(context);
               result += contextTemplate;
            });
         } else if (typeof target === "object") {
            Object.getOwnPropertyNames(target).forEach((key) => {
               const context = this.createContext(
                  indexKey,
                  key,
                  valueKey,
                  target[key]
               );
               const contextTemplate = templatorVariables.compile(context);
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

   private createContext(
      indexKey: string,
      index: string | number,
      valueKey: string,
      value: string
   ): Object {
      const obj: { [key: string]: string | number } = {};
      obj[indexKey] = index;
      obj[valueKey] = value;
      return obj;
   }

   private escapeRegExp(str: string): string {
      return str.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
   }
}
