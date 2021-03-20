import { Element } from "../../element";
import template from "./button.tmpl";
import "./button.scss";

export class Button extends Element {
    constructor(selector, options) {
        super(template, selector, options)
    }

    render() {
        super.render()
        // super.super(css)
    }
}



