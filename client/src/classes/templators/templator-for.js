/**
 * <v-for="(item, index) in array">
 *     {{content}}
 *  <v-for-end>
 *
 *  <v-for="(value, key) in object">
 *     {{content}}
 *  <v-for-end>
 */

import { get } from "../../utils/mydash/get";
import { TemplatorVariables } from "./templator-variables";

export class TemplatorFor {
   TEMPLATE_REGEXP = /<v-for(="\((.*?),\s(.*?)\)\sin\s(.*?)")>(.*?)<v-for-end>/gis;

   constructor(template) {
      this._template = template;
   }

   compile(ctx) {
      return this._compileTemplate(ctx);
   }

   _compileTemplate(ctx) {
      const regExp = this.TEMPLATE_REGEXP; // avoid from infinity loop
      let template = this._template;
      let result = '';
      let key = null;

      while ((key = regExp.exec(template))) {
         // console.log(key)
         const valueKey = key[2].trim();
         const indexKey = key[3].trim();
         const target = get(ctx, key[4].trim(), []);
         const content = key[5];
         const templatorVariables = new TemplatorVariables(content);

         if (Array.isArray(target)) {
            target.forEach((value, index) => {
               let context = this._createContext(indexKey, index, valueKey, value);
               let contextTemplate = templatorVariables.compile(context);
               result += contextTemplate;
            });
         } else
            if (typeof target === "object") {
               Object.getOwnPropertyNames(target)
                  .forEach((key) => {
                     let context = this._createContext(indexKey, key, valueKey, target[key]);
                     let contextTemplate = templatorVariables.compile(context);
                     result += contextTemplate;
                  })
            }

      }

      return result;
   }

   _createContext(indexKey, index, valueKey, value) {
      const obj = {};
      obj[indexKey] = index;
      obj[valueKey] = value;
      return obj;
   }

}