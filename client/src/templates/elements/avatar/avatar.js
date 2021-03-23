import { TemplatorVariables } from "/classes/templators/templator-variables";
import template from "./avatar.tmpl.js";
import "./avatar.scss"
import { TemplatorIf } from "/classes/templators/templator-if";
import unknownAvatar from '/assets/unknown_avatar.png';
import { strToColor } from "/utils/mydash/strToColor";



export class Avatar {
    constructor(options, salt = null) {
        this._template = template;
        options.src = options.src ?? unknownAvatar
        this.options = Object.assign(
            options,
            { borderColor: strToColor(options.src + salt) }
        );
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