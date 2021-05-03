import { App } from "../components/pages/App/App";
import { $ } from "../utils/dom-abstraction";
import { Component } from "./Component";

const chai = require("chai");
const spies = require("chai-spies");

chai.use(spies);

const { assert } = chai;
const { expect } = chai;
const should = chai.should();

before(() => {
   Object.defineProperty(window, "scrollTo", {
      value: (...args) => {},
      writable: true,
   });
});

describe("Test Component", () => {
   let component;
   let $app;
   let $body;
   let spy;

   describe("Create App component", () => {
      beforeEach(() => {
         $app = $.create("App");
         $body = $.create("body").append($app);
         component = new Component(App, $app);
      });

      afterEach(() => {
         component.$emit(component.EVENTS.DESTROY);
         component = null;
      });

      it("Comopnent exists", () => {
         should.exist(component);
      });

      it("Comopnent inserted in body (body has an element with class 'fluid-container')", () => {
         const conteiner = $body.find(".fluid-container");
         assert.isTrue(!!conteiner.$el, "[message]");
      });
   });

   describe("Check lifesycle", () => {
      const spyFunction = (param) => {
         // console.log(`Called: ${param}`);
      };
      spy = chai.spy(spyFunction);

      const Spy = {
         ...App,
         methods: {
            beforePrepare() {
               spy("App:beforePrepare");
            },
            beforeCreate() {
               spy("App:beforeCreate");
            },
            beforeInitChildren() {
               spy("App:beforeInitChildren");
            },
            beforeMount() {
               spy("App:beforeMount");
            },
            beforeInit() {
               spy("App:beforeInit");
            },
            afterInit() {
               spy("App:afterInit");
            },
            beforeUpdate() {
               spy("App:beforeUpdate");
            },
            beforeDestroy() {
               spy("App:beforeDestroy");
            },
         },
      };

      before(() => {
         $app = $.create("App");
         $body = $.create("body").append($app);
         component = new Component(Spy, $app);
      });

      after(() => {
         component.$emit(component.EVENTS.DESTROY);
         component = null;
      });

      it("CREATE lifecycle methods called", () => {
         expect(spy).to.have.been.called.with("App:beforePrepare");
         expect(spy).to.have.been.called.with("App:beforeCreate");
         expect(spy).to.have.been.called.with("App:beforeInitChildren");
         expect(spy).to.have.been.called.with("App:beforeMount");
         expect(spy).to.have.been.called.with("App:beforeInit");
         expect(spy).to.have.been.called.with("App:afterInit");
      });

      it("UPDATE lifecycle methods called", () => {
         component.$emit(component.EVENTS.UPDATE);
         expect(spy).to.have.been.called.with("App:beforeCreate");
         expect(spy).to.have.been.called.with("App:beforeInitChildren");
         expect(spy).to.have.been.called.with("App:beforeMount");
         expect(spy).to.have.been.called.with("App:beforeInit");
         expect(spy).to.have.been.called.with("App:afterInit");
         expect(spy).to.have.been.called.with("App:beforeUpdate");
         expect(spy).to.have.been.called.with("App:beforeDestroy");
      });
   });
});
