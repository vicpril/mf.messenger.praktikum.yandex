import { App } from "./components/App/App";
import { $ } from "./utils/dom-abstraction";
import { Component } from "./core/Component";

const $app = $("#app");
const app = new Component($app, App);
