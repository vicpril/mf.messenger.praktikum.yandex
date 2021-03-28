import { Templator } from "/classes/templators/templator";
import { ButtonCustom } from "/templates/elements/button/button";
import { Avatar } from "/templates/elements/avatar/avatar";
import { InputFile } from "/templates/elements/input-file/input-file";
import template from "./form-avatar-change.tmpl.js";
import "./form-avatar-change.scss";
import modelAccount from "/models/modelAccount";
import { getFormData } from "/utils/mydash/form-data";

export class FormAvatarChangeContent {
    constructor() {
        this.template = template;
        this.user = getAccount();
    }

    render() {

        const context = {
            user: this.user,
            avatar: (new Avatar({
                id: "user_info__avatar",
                css: "user__avatar avatar__info",
                src: this.user.avatar
            }, this.user.login)).render(),

            input_file: (new InputFile({
                id: "avatar_upload",
                onchange: this._changeAvatarImg
            })).render(),

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
        const form = document.querySelector(".form__avatar_change");
        const formData = new FormData(form);
        const data = getFormData(formData);

        console.log('Avatar change form data:', data);
    }

    _changeAvatarImg() {
        const img = document.getElementById("user_info__avatar");
        const newSrc = this.value;
        img.src = newSrc;
    }

}

function getAccount() {
    return modelAccount;
}
