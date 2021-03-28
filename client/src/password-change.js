import 'regenerator-runtime/runtime'
import { App } from "./classes/app";


import "./styles/styles.scss";

const app = new App('#app');

app.init("password-change");
