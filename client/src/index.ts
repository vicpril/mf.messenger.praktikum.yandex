// eslint-disable-next-line import/no-extraneous-dependencies
import "regenerator-runtime/runtime";

import { $ } from "./utils/dom-abstraction";
import { Component } from "./core/Component";
import { DefaultPage } from "./components/pages/DefaultPage/DefaultPage";
import { SignIn } from "./components/pages/SignIn/SignIn";

const $app = $("#app");
new Component($app, DefaultPage, null, { components: [SignIn] });
// const app = new Component($app, App);

// console.log(app);
