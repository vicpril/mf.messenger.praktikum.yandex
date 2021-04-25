// eslint-disable-next-line import/no-extraneous-dependencies
import "regenerator-runtime/runtime";

import { $ } from "./utils/dom-abstraction";
import { Component } from "./core/Component";
import { App } from "./components/structural/App/App";
import { createStore } from "./core/store/Store";
import { rootReducer } from "./core/store/rootReducer";
import { storage } from "./utils/storage";

const store = createStore(rootReducer, {
   title: "Welcome to Chats",
   ...storage("ec-app-state"),
});

store.subscribe((state) => {
   console.log("App state: ", state);
   storage("ec-app-state", state);
});

const $app = $("#app");
new Component($app, App, null);
