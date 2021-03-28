import 'regenerator-runtime/runtime'
import { App } from "./classes/app";
import "/utils/prototypes.custom";

import "./styles/styles.scss";

const app = new App('#app');

app.init("account");
