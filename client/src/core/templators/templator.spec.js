import { trim } from "../../utils/pure-functions";
import { Templator } from "./templator";

let chai = require("chai");

const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

describe("Templator FULL", () => {
   const template = `
   <v-if="object">
   <v-for :item :key in object>{{key}}: {{item}}, </v-for>
   <v-else>Object is unfefined</v-if>
   `;
   context("- Test templator for object", () => {
      const context = {
         object: { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 },
      };
      const exp = trim(
         Object.getOwnPropertyNames(context.object).reduce((acc, key) => {
            acc += `${key}: ${context.object[key]}, `;
            return acc;
         }, "")
      );

      it(`Expect "${exp}"`, () => {
         const templator = new Templator(template);
         let result = templator.compile(context);
         assert.strictEqual(trim(result), exp);
      });
   });
   context("- Test templator if wrong ", () => {
      const context = {
         anotherObject: { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 },
      };
      const exp = "Object is unfefined";

      it(`Expect "${exp}"`, () => {
         const templator = new Templator(template);
         let result = templator.compile(context);
         assert.strictEqual(trim(result), exp);
      });
   });
});
