// eslint-disable-next-line import/no-extraneous-dependencies
import "regenerator-runtime/runtime";
import { ErrorPage500 } from "../components/pages/ErrorPage/500";
import { Component } from "../core/Component";

import { $ } from "../utils/dom-abstraction";

new Component($("#app"), ErrorPage500);
