/**
 *  <v-if="var1 === var1">
 *      var1: {{var1}}
 *  </v-if>
 * 
 *  <v-if="var1 >= var2">
 *      {{var1}}
 *  <v-else>
 *      {{var2}}
 *  </v-if>
 */

import { get } from "/utils/mydash/get";
import { compare } from "/utils/mydash/compare";
import { isUndefined } from "/utils/mydash/isUndefined";
import { trimQuotes } from "/utils/mydash/trimQuotes";

export class TemplatorIf {
   TEMPLATE_REGEXP = /<v-if(="(.*?)")>(.*?)(<v-else>(.*?))?<\/v-if>/gis;
   COMPARE_REGEXP = /\!?(\w+)((.*?)(\'?!?\w+\'?))?/;

   constructor(template) {
      this._template = template;
   }

   compile(ctx) {
      return this._compileTemplate(ctx);
   }

   _compileTemplate(ctx, newTemplate = null) {
      const regExp = this.TEMPLATE_REGEXP; // avoid from infinity loop
      let template = newTemplate ?? this._template;
      let result = template;
      let key = null;

      while ((key = regExp.exec(template))) {

         const condition = key[2].trim();
         const partIf = key[3].trim();
         const partElse = isUndefined(key[5])
            ? ""
            : key[5].trim();

         const [postString, operator, valueString] = this._parseCondition(condition);

         let post
         if (postString.charAt(0) !== "!") {
            post = get(ctx, postString)
         } else {
            post = !get(ctx, postString.slice(1))
         }

         if (isUndefined(post)) {
            result = result.replace(new RegExp(key[0], "gi"), partElse);
            continue;
         }

         let value
         if (!isUndefined(valueString)) {
            if (valueString.charAt(0) !== "!") {
               value = get(ctx, valueString)
            } else {
               value = !get(ctx, valueString.slice(1))
            }
         } else {
            value = valueString;
         }

         post = post === "null" ? null : post
         if (compare(post, operator, value)) {
            result = result.replace(new RegExp(key[0], "gi"), partIf);
         } else {
            result = result.replace(new RegExp(key[0], "gi"), partElse);
         }
         continue;

      }

      return result;
   }

   _parseCondition(str) {
      const regExp = this.COMPARE_REGEXP;
      const keys = regExp.exec(str);
      if (!isUndefined(keys[3])) {
         const post = trimQuotes(keys[1]);
         const value = trimQuotes(keys[4]);
         const operator = keys[3].trim();
         return [post, operator, value];
      } else {
         const post = trimQuotes(str);
         return [post]; // set a variable only
      }


   }
}