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

import { get, isUndefined, trimQuotes } from "../../utils/pure-functions";

import { IContext } from "./templatorInterface";
import { MapCompiler } from "./map-compiler";
import { TagsMapBuilder } from "./tags-map-builder";
import { compare } from "../../utils/compare";

export class TemplatorIf {
   TEMPLATE_REGEXP = /<v-if(="(.*?)")>(.*?)(<v-else>(.*?))?<\/v-if>/gis;
   COMPARE_REGEXP = /!?([\w.]+)((.*?)('?!?[\w.]+'?))?/;

   constructor(private template: string) {}

   compile(context: IContext) {
      /**
       * We need to compile recursive this templator
       * So I use TagsMapBuilder and MapCompiler to build intervals^
       *       [start, end][], where
       *       - start is the start position of local template
       *       - end a the end position of local template
       * Next I define and compile local templates
       *       and replece them in the global template.
       */
      const mapBuilder = new TagsMapBuilder(
         this.template,
         `<v-if(="(.*?)")>`,
         `</v-if>`
      );
      const tagMap = mapBuilder.build();

      const combiner = new MapCompiler(tagMap);
      const intervals = combiner.combineMap();

      const toLocalTemplates = (int: [number, number]) =>
         this.template.slice(int[0], int[1]);
      const toLocalTemplatesCompiled = (template: string) => {
         const templator = new TemplatorIf(template);
         return templator._compileAtoms(context);
      };

      intervals.map(toLocalTemplates).forEach((local: string) => {
         const localCompiled = toLocalTemplatesCompiled(local);
         this.template = this.template.replace(
            new RegExp(this.escapeRegExp(local), "gi"),
            localCompiled
         );
      });

      return this._compileAtoms(context);
   }

   private _compileAtoms(context: IContext, newTemplate: string | null = null) {
      const regExp = this.TEMPLATE_REGEXP; // avoid from infinity loop
      const template = newTemplate ?? this.template;
      let result = template;
      let key = null;

      while ((key = regExp.exec(template))) {
         const condition = key[2].trim();
         const partIf = key[3].trim();
         const partElse = isUndefined(key[5]) ? "" : key[5].trim();

         const [postString, operator, valueString] =
            this._parseCondition(condition);

         let post;
         if (postString.charAt(0) !== "!") {
            post = get(context, postString);
         } else {
            post = !get(context, postString.slice(1));
         }

         if (isUndefined(post)) {
            result = result.replace(new RegExp(key[0], "gi"), partElse.trim());
            continue;
         }

         let value;
         if (!isUndefined(valueString)) {
            if (valueString.charAt(0) !== "!") {
               value = get(context, valueString, valueString);
            } else {
               value = !get(
                  context,
                  valueString.slice(1),
                  valueString.slice(1)
               );
            }
         } else {
            value = valueString;
         }

         post = post === "null" ? null : post;
         if (compare(post, operator, value)) {
            result = result.replace(
               new RegExp(this.escapeRegExp(key[0]), "gi"),
               partIf.trim()
            );
         } else {
            result = result.replace(
               new RegExp(this.escapeRegExp(key[0]), "gi"),
               partElse.trim()
            );
         }
         continue;
      }

      return result;
   }

   _parseCondition(string: string) {
      const regExp = this.COMPARE_REGEXP;
      const keys = regExp.exec(string);
      if (keys && !isUndefined(keys[3])) {
         const post = trimQuotes(keys[1]);
         const value = trimQuotes(keys[4]);
         const operator = keys[3].trim();
         return [post, operator, value];
      }
      const post = trimQuotes(string);
      return [post]; // set a variable only
   }

   private escapeRegExp(str: string): string {
      return str.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
   }
}
