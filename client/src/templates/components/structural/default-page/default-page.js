import { TemplatorVariables } from "/classes/templators/templator-variables";
import template from "./default-page.tmpl.js";
import "./default-page.scss";

export class DefaultPage {
    constructor(context) {
        this.template = template;
        this.context = context;
    }

    render() {

        const context = Object.assign({
            title: "Welcome to Easy conversation chats",
            content: "You will find a companion for any topic here"
        }, this.context)

        const tepmlator = new TemplatorVariables(this.template);
        return tepmlator.compile(context);
    }

}
