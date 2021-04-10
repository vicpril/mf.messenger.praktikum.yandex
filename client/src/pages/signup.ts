// eslint-disable-next-line import/no-extraneous-dependencies
import "regenerator-runtime/runtime";
import { DefaultPage } from "../components/pages/DefaultPage/DefaultPage";
import { SignUp } from "../components/pages/SignUp/SignUp";
import { Component } from "../core/Component";

// import "../styles/styles.scss";
import { $ } from "../utils/dom-abstraction";

const app = new Component($("#app"), DefaultPage, null, {
   components: [SignUp],
});

// app.init("404");
