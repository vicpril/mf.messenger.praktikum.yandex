// eslint-disable-next-line import/no-extraneous-dependencies
import "regenerator-runtime/runtime";

import { $ } from "../utils/dom-abstraction";
import { App } from "../components/structural/App/App";
import { Component } from "../core/Component";

const $app = $("#app");
new Component($app, App, null, { page: "contact-info" });
