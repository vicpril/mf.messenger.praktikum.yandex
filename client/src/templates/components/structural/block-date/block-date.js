import { TemplatorVariables } from "/classes/templators/templator-variables";
import template from "./block-date.tmpl.js";
import "./block-date.scss";

export class BlockDate {
    constructor(content) {
        this.template = template;
        this.content = content;
    }

    render() {
        const context = {
            content: this.content
        };

        const tepmlator = new TemplatorVariables(this.template);
        return tepmlator.compile(context);
    }


}