import "regenerator-runtime/runtime";

import { $ } from "./utils/dom-abstraction";
import { App } from "./components/App/App";
import { Component } from "./core/Component";

const $app = $("#app");
const app = new Component($app, App);
