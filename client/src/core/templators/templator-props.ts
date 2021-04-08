/**
 *  <ComponentName bind:prop=parentProp></ComponentName>
 *
 * Group 0  bind:prop="parentProp
 * Group 1  prop
 * Group 2  parentProp
 */

import { get } from "../../utils/pure-functions";

export class TemplatorProps {
   TEMPLATE_REGEXP = /bind:(\w+)=\"([\w\.]+[\[\d+\]]*?)\"/gis;

   constructor(private template: string) {}

   compile(context: Object) {
      return this._compileTemplate(context);
   }

   private _compileTemplate(context: Object) {
      const regExp = this.TEMPLATE_REGEXP; // avoid from infinity loop
      let template = this.template;
      let key = null;
      const result = {};

      while ((key = regExp.exec(template))) {
         const value = get(context, key[2], key[2]);
         result[key[1]] = value;
      }

      return result;
   }
}
