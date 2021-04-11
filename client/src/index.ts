// eslint-disable-next-line import/no-extraneous-dependencies
import "regenerator-runtime/runtime";

import { $ } from "./utils/dom-abstraction";
import { Component } from "./core/Component";
import { DefaultPage } from "./components/pages/DefaultPage/DefaultPage";
import { SignUp } from "./components/pages/SignUp/SignUp";

const $app = $("#app");
new Component($app, DefaultPage, null, { components: [SignUp] });
// const app = new Component($app, App);

// console.log(app);
