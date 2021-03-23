import { Templator } from "/classes/templators/templator";
import template from "./main.tmpl.js";
import "./main.scss";
import { FormSendMessage } from "../form-send-message/form-send-message.js";

export class MainContainer {
    constructor() {
        this.template = template;
    }

    render() {
        const context = {
            form_send_message: (new FormSendMessage()).render()
        };

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }


}