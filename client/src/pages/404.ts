// eslint-disable-next-line import/no-extraneous-dependencies
import "regenerator-runtime/runtime";
import { ErrorPage404 } from "../components/pages/ErrorPage/404";
import { Component } from "../core/Component";

// import "../styles/styles.scss";
import { $ } from "../utils/dom-abstraction";

const app = new Component($("#app"), ErrorPage404);

// app.init("404");
