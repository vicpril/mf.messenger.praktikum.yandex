// eslint-disable-next-line import/no-extraneous-dependencies
import "regenerator-runtime/runtime";

import { createStore } from "./core/store/Store";
import { rootReducer } from "./core/store/rootReducer";
import { storage } from "./utils/storage";
import { Router } from "./core/router/Router";
import { AppController } from "./controllers/AppController/AppController";
import { SigninController } from "./controllers/SigninController/SigninController";
import { SignupController } from "./controllers/SignupController/SignupController";

const store = createStore(rootReducer, {
   title: "Welcome to Chats",
   ...storage("ec-app-state"),
});

store.subscribe((state) => {
   console.log("App state: ", state);
   storage("ec-app-state", state);
});

new Router()
   .use("chats", AppController.index())
   .use("signin", SigninController.index())
   .use("signup", SignupController.index())
   .use("404", AppController.error404())
   .use("500", AppController.error500())
   .init("#app");
