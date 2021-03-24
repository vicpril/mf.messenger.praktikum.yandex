import { TemplatorVariables } from "/classes/templators/templator-variables";
import { TemplatorIf } from "/classes/templators/templator-if";
import template from "./counter.tmpl.js";
import "./counter.scss"

export class Counter {
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