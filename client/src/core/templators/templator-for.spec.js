import { TemplatorFor } from "./templator-for";
import { TemplatorVariables } from "./templator-variables";

const chai = require("chai");

const { assert } = chai;
const { expect } = chai;
const should = chai.should();

describe("Templator FOR", () => {
   context("- Test templator for array", () => {
      const template = `<v-for :item :index in array>{{index}}: {{item}}, {{array}}</v-for>`;

      const context = {
         array: [1, 2, 3],
      };

      const exp = context.array.reduce((acc, curr, index) => {
         acc += `${index}: ${curr}, `;
         return acc;
      }, "");

      it(`Expect "${exp}"`, () => {
         const templatorFor = new TemplatorFor(template);
         const result = templatorFor.compile(context);
         assert.strictEqual(result, exp);
      });
   });

   context("- Test templator for object", () => {
      const template = `<v-for :item :key in object>{{key}}: {{item}}, </v-for>`;

      const context = {
         object: { a: 1, b: 2, c: 3 },
      };

      const exp = Object.getOwnPropertyNames(context.object).reduce(
         (acc, key) => {
            acc += `${key}: ${context.object[key]}, `;
            return acc;
         },
         ""
      );

      it(`Expect "${exp}"`, () => {
         const templatorFor = new TemplatorFor(template);
         const result = templatorFor.compile(context);
         assert.strictEqual(result, exp);
      });
   });
});
