import { TemplatorVariables } from "/classes/templators/templator-variables";
import { TemplatorIf } from "/classes/templators/templator-if";
import template from "./input-group.tmpl.js";
import "./input-group.scss"
import { InputCustom } from "/templates/elements/input/input";
import { strToLodash } from "/utils/mydash/string";
import { get } from "/utils/mydash/get";

export class InputGroup {
    constructor(title, options = {}) {
        this._template = template;
        this.title = title
        this.options = options
    }

    render() {
        const context = {
            title: this.title,
            css: this.options.css ?? "",
            id: get(this.options, "input.id", strToLodash(this.title)),
            input: (new InputCustom({
                id: get(this.options, "input.id", strToLodash(this.title)),
                name: get(this.options, "input.name", strToLodash(this.title)),
                css: get(this.options, "input.css", ""),
                value: get(this.options, "input.value", ""),
                required: get(this.options, "input.required", false)
            })).render()
        }

        const templatorIf = new TemplatorIf(this._template);
        this._template = templatorIf.compile(context);
        const templatorVariables = new TemplatorVariables(this._template);
        this._template = templatorVariables.compile(context);
        return this._template;
    }
}