const chai = require("chai");
const { XHR } = require("./XHR");

const { assert } = chai;

describe("Test XML module", () => {
   const host = "https://httpbin.org/";
   const data = { a: "123", b: "hello" };

   const isSame = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

   it("GET: Returns GET args", async () => {
      const { args: result } = await XHR.get(`${host}/get`, { data });
      assert.isTrue(isSame(data, result), "Result is not equal data - GET");
   });

   it("POST: Returns POST data", async () => {
      const { json: result } = await XHR.post(`${host}/post`, { data });
      assert.isTrue(isSame(data, result), "Result is not equal data - POST");
   });

   it("PUT: Returns PUT args & data", async () => {
      const { args, json: result } = await XHR.put(`${host}/put?id=42`, {
         data,
      });
      assert.isTrue(
         isSame({ id: "42" }, args),
         `Args is not equal {id: "42"} - PUT`
      );
      assert.isTrue(isSame(data, result), "Result is not equal data - PUT");
   });

   it("DELETE: Returns DELETE args", async () => {
      const { args: result } = await XHR.delete(`${host}/delete?id=42`);
      assert.isTrue(
         isSame({ id: "42" }, result),
         "Args is not equal data - DELETE"
      );
   });
});
