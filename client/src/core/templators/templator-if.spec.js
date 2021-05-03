import { trim } from "../../utils/pure-functions";
import { TemplatorIf } from "./templator-if";
import { TemplatorVariables } from "./templator-variables";

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

   context("- true part should content {{var1}}", () => {
      const templator = new TemplatorIf(template);
      const context = {
         var1: 2,
         var2: 1,
      };
      it(`Should return "{{var1}}"`, () => {
         const result = templator.compile(context);
         assert.strictEqual(trim(result), "{{var1}}");
      });
   });

   context("- true part should content {{var2}}", () => {
      const templator = new TemplatorIf(template);
      const context = {
         var1: 1,
         var2: 2,
      };
      it(`Should return "{{var2}}"`, () => {
         const result = templator.compile(context);
         assert.strictEqual(trim(result), "{{var2}}");
      });
   });
});

describe("Templator IF + Variable", () => {
   const template = `
    <v-if="var1 >= var2">
        {{var1}}
    <v-else>
        {{var2}}
    </v-if>
   `;

   context("- true part should return content of var1", () => {
      const context = {
         var1: 2,
         var2: 1,
      };

      it(`- true part should return "${context.var1}"`, () => {
         const templatorIf = new TemplatorIf(template);
         let result = templatorIf.compile(context);
         const templatorVar = new TemplatorVariables(result);
         result = templatorVar.compile(context);
         assert.strictEqual(trim(result), context.var1.toString());
      });
   });

   context("- true part should content {{var2}}", () => {
      const context = {
         var1: 1,
         var2: 2,
      };

      it(`- false part should return "${context.var2}"`, () => {
         const templatorIf = new TemplatorIf(template);
         let result = templatorIf.compile(context);
         const templatorVar = new TemplatorVariables(result);
         result = templatorVar.compile(context);
         assert.strictEqual(trim(result), context.var2.toString());
      });
   });
});
