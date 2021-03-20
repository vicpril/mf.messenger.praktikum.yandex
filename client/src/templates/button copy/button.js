import { Element } from "../../classes/Element";
import template from "./button.tmpl";
import css from "./button.scss";

export class Button extends Element {
    constructor(selector, options) {
        super(template, selector, options)
    }

    render() {
        super.render(css)
        // super.super(css)
    }
}



