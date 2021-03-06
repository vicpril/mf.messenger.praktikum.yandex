import { TemplatorVariables } from "./templator-variables";

const chai = require("chai");

const { assert } = chai;
const { expect } = chai;
const should = chai.should();

describe("Templator variables", () => {
   context("- using Variables", () => {
      const template = `{{content}}`;
      const templator = new TemplatorVariables(template);
      const context = {
         content: null,
      };

      context.content = 123;
      it(`{{content}} should print "${context.content}"`, () => {
         const result = templator.compile(context);

         assert.equal(result, context.content);
      });

      it(`Prented should be a string`, () => {
         const result = templator.compile(context);
         assert.isString(result, "in string");
      });
   });

   context("- using Objects", () => {
      const output = (obj) => JSON.stringify(obj, null, 2);

      const template = `{{content}}`;
      const templator = new TemplatorVariables(template);
      const context = {
         content: { a: 123 },
      };

      it(`Result should be a printed object"`, () => {
         const result = templator.compile(context);
         assert.equal(result, output(context.content));
      });

      it(`Prented should be a string`, () => {
         const result = templator.compile(context);
         assert.isString(result, "in string");
      });
   });

   context("- using void Functions", () => {
      const output = () => {};

      const template = `{{content}}`;
      const templator = new TemplatorVariables(template);
      const context = {
         content: output,
      };

      it(`Output is a string`, () => {
         const result = templator.compile(context);
         assert.isString(result, "in string");
      });

      it(`Output starts with "window" & ends "()"`, () => {
         const result = templator.compile(context);
         const regexp = new RegExp(/^window.*\(\)$/gs);
         assert.isTrue(regexp.test(result), "regexp test is true");
      });
   });
});
