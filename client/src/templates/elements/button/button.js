import { TemplatorIf } from "/classes/templators/templator-if";
import { TemplatorVariables } from "/classes/templators/templator-variables";
import template from "./button.tmpl.js";
import "./button.scss";

export class ButtonCustom {
    constructor(options) {
        this._template = template;
        this.options = options
    }

    render() {
        const context = this.options;

        const templatorIf = new TemplatorIf(this._template);
        this._template = templatorIf.compile(context);
        const templatorVariables = new TemplatorVariables(this._template);
        this._template = templatorVariables.compile(context);
        return this._template;
    }


}