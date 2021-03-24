import { Templator } from "./classes/templators/templator";
import template from "./_templ.tmpl.js";
import "./_templ.scss";

export class _Templ {
    constructor() {
        this.template = template;
    }

    render() {
        const context = {};

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }


}