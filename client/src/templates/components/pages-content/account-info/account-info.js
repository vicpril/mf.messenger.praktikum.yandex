import { Templator } from "/classes/templators/templator";
import { ButtonCustom } from "/templates/elements/button/button";
import { Avatar } from "/templates/elements/avatar/avatar";
import template from "./account-info.tmpl.js";
import "./account-info.scss";
import modelAccount from "/models/modelAccount";

export class AccountInfoContent {
    constructor() {
        this.template = template;
        this.user = getAccount();
    }

    render() {

        const context = {
            user: this.user,
            avatar: (new Avatar({
                css: "user__avatar avatar__info",
                src: this.user.avatar
            }, this.user.login)).render(),

            button_change_avatar: (new ButtonCustom({
                css: "info__button button_outline_primary",
                type: "button",
                title: "Change avatar",
                onclick: () => { document.location.href = "/account/avatar-edit/"; }
            })).render(),
            button_change_settings: (new ButtonCustom({
                css: "info__button button_outline_primary",
                type: "button",
                title: "Account settings",
                onclick: () => { document.location.href = "/account/settings/"; }
            })).render(),
            button_change_password: (new ButtonCustom({
                css: "info__button button_outline_primary",
                type: "button",
                title: "Change password",
                onclick: () => { document.location.href = "/account/password-change/"; }
            })).render(),
        };

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }

}

function getAccount() {
    return modelAccount;
}
