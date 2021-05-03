const { AppController } = require("../../controllers/App/AppController");
const { AuthController } = require("../../controllers/Auth/AuthController");
const { Router } = require("./Router");

const chai = require("chai");

const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

const index = `<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Easy conversation</title>
      <link rel="shortcut icon" href="/assets/favicon.png" type="image/png" />
   </head>

   <body class="scroll_style">
      <div id="app"></div>
   </body>
</html>
`;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const dom = new JSDOM(index, {
   url: "http://localhost:3000/",
});

let router;
const getPageName = (route) => {
   const pagename = route.page.props.pagename;
   if (!pagename) return undefined;

   if (pagename === "defaultpage")
      return route.page.componentsInst[0].props.pagename ?? undefined;

   return pagename ?? undefined;
};

before(() => {
   window = dom.window;
   document = dom.window.document;
   Object.defineProperty(window, "scrollTo", {
      value: (...args) => {},
      writable: true,
   });
});

beforeEach(() => {
   router = new Router();
   router
      .use("chats", AppController.index())
      .use("signin", AuthController.indexSignIn())
      .use("signup", AuthController.indexSignUp())
      .use("404", AppController.error404())
      .use("500", AppController.error500());
   router.init("#app");
});

describe("Router testing", () => {
   context("Test navigation", () => {
      it("Home page is 'signin'", () => {
         const currentRoute = router.getCurrentRoute();
         assert(getPageName(currentRoute), "signin", "Home page");
      });

      ["chats", "signin", "signup", "404", "500"].forEach((page) => {
         it(`Navigate to ${page}`, () => {
            router.navigate(page);
            const currentRoute = router.getCurrentRoute();
            assert(getPageName(currentRoute), page, `${page} page`);
         });
      });

      it("404 error", () => {
         router.navigate("some-different-page");
         const currentRoute = router.getCurrentRoute();
         assert(getPageName(currentRoute), "404", `should be 404`);
      });
   });
});
