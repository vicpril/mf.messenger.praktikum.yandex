// eslint-disable-next-line import/no-extraneous-dependencies
import "regenerator-runtime/runtime";

import { $ } from "./utils/dom-abstraction";
import { Component } from "./core/Component";
import { App } from "./components/structural/App/App";

const $app = $("#app");
new Component($app, App);
