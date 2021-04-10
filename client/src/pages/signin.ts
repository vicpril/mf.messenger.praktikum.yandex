// eslint-disable-next-line import/no-extraneous-dependencies
import "regenerator-runtime/runtime";
import { DefaultPage } from "../components/pages/DefaultPage/DefaultPage";
import { SignIn } from "../components/pages/SignIn/SignIn";
import { Component } from "../core/Component";

// import "../styles/styles.scss";
import { $ } from "../utils/dom-abstraction";

const app = new Component($("#app"), DefaultPage, null, {
   components: [SignIn],
});

// app.init("404");
