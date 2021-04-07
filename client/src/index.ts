import { App } from "./components/App/App";
import "./style/style.scss";
import { LeftSidebar } from "./components/LeftSidebar/LeftSidebar";
import { $ } from "./utils/dom-abstraction";
import { Component } from "./core/Component";

const $app = $("#app");
const app = new Component($app, App);

// app.render();
