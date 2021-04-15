// eslint-disable-next-line import/no-extraneous-dependencies
import "regenerator-runtime/runtime";
import { ErrorPage404 } from "../components/pages/ErrorPage/404";
import { Component } from "../core/Component";

import { $ } from "../utils/dom-abstraction";

new Component($("#app"), ErrorPage404);
