import { Templator } from "/classes/templators/templator";
import { ButtonCustom } from "/templates/elements/button/button";
import template from "./form-account-settings.tmpl.js";
import "./form-account-settings.scss";
import modelAccount from "/models/modelAccount";
import { lodashToStr } from "/utils/mydash/string";
import { InputGroup } from "/templates/elements/input-group/input-group.js";
import { getFormData } from "/utils/mydash/form-data";

export class FormAccountSettingsContent {
    constructor() {
        this.template = template;
        this.user = getAccount();
    }

    render() {

        const fields = [
            "login",
            "email",
            "first_name",
            "last_name",
            "display_name"
        ].map(key => (new InputGroup(lodashToStr(key), {
            input: {
                id: key,
                name: key,
                value: this.user[key]
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
                onclick: () => { document.location.href = "/account/"; }
            })).render()
        };

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }

    _onsubmit() {
        const form = document.querySelector(".form__account_settings");
        const formData = new FormData(form);
        const data = getFormData(formData);

        console.log('Send form data:', data);
    }

}

function getAccount() {
    return modelAccount;
}


