import { Templator } from "/classes/templators/templator";
import { ButtonCustom } from "/templates/elements/button/button";
import template from "./form-sign-up.tmpl.js";
import "./form-sign-up.scss";
import { lodashToStr } from "/utils/mydash/string";
import { InputGroup } from "/templates/elements/input-group/input-group.js";
import { getFormData } from "/utils/mydash/form-data";

export class FormSignUp {
    constructor() {
        this.template = template;
    }

    render() {

        const fields = [
            "login",
            "email",
            "first_name",
            "last_name",
            "password",
            "phone",
        ].map(key => (new InputGroup(lodashToStr(key), {
            input: {
                id: key,
                name: key,
                type: key === "password" ? "password" :
                    key === "email" ? "email" : "text"
            }
        })).render());

        const context = {
            fields: fields,

            onsubmit: this._onsubmit.bind(this),
            prevent_action: "event.preventDefault();",

            button_sign_up: (new ButtonCustom({
                css: "info__button button_primary",
                type: "submit",
                title: "Sign up",
            })).render(),

        };

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }

    _onsubmit() {
        const form = document.querySelector(".form__sign_up");
        const formData = new FormData(form);
        const data = getFormData(formData);

        console.log('Registration form data:', data);
    }

}
