import { Templator } from "/classes/templators/templator";
import { ButtonCustom } from "/templates/elements/button/button";
import template from "./form-password-change.tmpl.js";
import "./form-password-change.scss";
import modelAccount from "/models/modelAccount";
import { lodashToStr } from "/utils/mydash/string";
import { InputGroup } from "/templates/elements/input-group/input-group.js";
import { getFormData } from "/utils/mydash/form-data";

export class FormPasswordChangeContent {
    constructor() {
        this.template = template;
        this.user = getAccount();
    }

    render() {

        const fields = [
            "old_password",
            "new_password",
            "confirm_new_password",
        ].map(key => (new InputGroup(lodashToStr(key), {
            input: {
                id: key,
                name: key,
                type: "password"
            }
        })).render());

        const context = {
            user: this.user,
            fields: fields,

            onsubmit: this._onsubmit.bind(this),
            prevent_action: "event.preventDefault();",

            button_update: (new ButtonCustom({
                css: "info__button button_primary",
                type: "submit",
                title: "Update",
            })).render(),

            button_cancel: (new ButtonCustom({
                css: "info__button button_outline_primary",
                type: "button",
                title: "Cancel",
                onclick: () => { document.location.href = "/account.html"; }
            })).render()
        };

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }

    _onsubmit() {
        const form = document.querySelector(".form__password_change");
        const formData = new FormData(form);
        const data = getFormData(formData);

        console.log('Password changing form data:', data);
    }

}

function getAccount() {
    return modelAccount;
}


