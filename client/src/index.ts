// eslint-disable-next-line import/no-extraneous-dependencies
import "regenerator-runtime/runtime";

import { createStore } from "./core/store/Store";
import { rootReducer } from "./core/store/rootReducer";
import { storage } from "./utils/storage";
import { Router } from "./core/router/Router";
import { AppController } from "./controllers/App/AppController";
import { AuthController } from "./controllers/Auth/AuthController";

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
   .use("signin", AuthController.indexSignIn())
   .use("signup", AuthController.indexSignUp())
   .use("404", AppController.error404())
   .use("500", AppController.error500())
   .init("#app");
