import { TemplatorIf } from "./templator-if";

let chai = require("chai");

const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

describe("Templator IF", () => {
   const template = `
    <v-if="var1 >= var2">
        {{var1}}
    <v-else>
        {{var2}}
    </v-if>
   `;

   context("- true part should content var1", () => {
      const templator = new TemplatorIf(template);
      const context = {
         var1: 2,
         var2: 1,
      };
      it(`Should return "${context.var1}"`, () => {
         const result = templator.compile(context);
         assert.equal(result, context.var1);
      });

      it(`Prented should be a string`, () => {
         const result = templator.compile(context);
         assert.isString(result, "in string");
      });
   });
});
