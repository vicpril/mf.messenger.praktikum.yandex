// eslint-disable-next-line import/no-extraneous-dependencies
import "regenerator-runtime/runtime";
import { ErrorPage500 } from "../components/pages/ErrorPage/500";
import { Component } from "../core/Component";

// import "../styles/styles.scss";
import { $ } from "../utils/dom-abstraction";

const app = new Component($("#app"), ErrorPage500);

// app.init("404");
