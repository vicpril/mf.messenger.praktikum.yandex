import { Templator } from "/classes/templators/templator";
import { ButtonCustom } from "/templates/elements/button/button";
import template from "./form-sign-in.tmpl.js";
import "./form-sign-in.scss";
import { lodashToStr } from "/utils/mydash/string";
import { InputGroup } from "/templates/elements/input-group/input-group.js";
import { getFormData } from "/utils/mydash/form-data";

export class FormSignIn {
    constructor() {
        this.template = template;
    }

    render() {

        const fields = [
            "login",
            "password",
        ].map(key => (new InputGroup(lodashToStr(key), {
            input: {
                id: key,
                name: key,
                type: key === "password" ? "password" : "text"
            }
        })).render());

        const context = {
            fields: fields,

            onsubmit: this._onsubmit.bind(this),
            prevent_action: "event.preventDefault();",

            button_sign_in: (new ButtonCustom({
                css: "info__button button_primary",
                type: "submit",
                title: "Sign in",
            })).render(),

            button_sign_up: (new ButtonCustom({
                css: "info__button button_outline_primary",
                type: "button",
                title: "Sign up",
                onclick: () => { document.location.href = "/sign-up/"; }
            })).render()
        };

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }

    _onsubmit() {
        const form = document.querySelector(".form__sign_in");
        const formData = new FormData(form);
        const data = getFormData(formData);

        console.log('Login form data:', data);
    }

}
