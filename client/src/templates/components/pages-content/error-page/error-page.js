import { TemplatorVariables } from "/classes/templators/templator-variables";
import template from "./error-page.tmpl.js";
import "./error-page.scss";
import { DefaultPage } from "/templates/components/structural/default-page/default-page";

export class ErrorPage {
    constructor(context) {
        this.template = template;
        this.context = context;
    }

    render() {
        this.context.link = `<a href="/">&larr; Let's go back</a>`;

        const tepmlator = new TemplatorVariables(this.template);
        const sidebar_content = tepmlator.compile({ code: this.context.code });
        this.context.sidebar_content = sidebar_content;

        return (new DefaultPage(this.context)).render();

    }

}
