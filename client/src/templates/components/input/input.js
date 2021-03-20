import { Element } from "../../element";
import template from "./input.tmpl";
import "./input.scss";

export class Input extends Element {
    constructor(selector, options) {
        super(template, selector, options)
    }

    render() {
        super.render()
        // super.super(css)
    }
}



