import { Templator } from "/classes/templators/templator";
import { ButtonCustom } from "/templates/elements/button/button";
import { Avatar } from "/templates/elements/avatar/avatar";
import template from "./contact-info.tmpl.js";
import "./contact-info.scss";
import modelChats from "/models/modelChats";
import { getUrlParameter } from "/utils/mydash/getUrl";
import { first } from "/utils/mydash/first";


export class ContactInfoContent {
    constructor() {
        this.template = template;
        this.user = this._getUser();
    }

    render() {

        const context = this.user ? {
            user: this.user,
            avatar: (new Avatar({
                css: "user__avatar avatar__info",
                src: this.user.avatar
            }, this.user.login)).render(),

            button_mute_notification: (new ButtonCustom({
                css: "info__button button_outline_primary",
                type: "button",
                title: "Mute notifications",
                onclick: this.muteNotifications.bind(this)
            })).render(),
            button_delete_chat: (new ButtonCustom({
                css: "info__button button_outline_danger",
                type: "button",
                title: "Delete chat",
                onclick: this.deleteChat.bind(this)
            })).render(),
        } : {};

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }

    muteNotifications() {
        console.log(`Notifications from ${this.user.display_name} are muted!`);
    }

    deleteChat() {
        console.log(`Chat with ${this.user.display_name} is deleting...`);
    }

    _getUser() {
        const userlogin = getUrlParameter('user');
        if (!userlogin) {
            return null;
        }
        const user = first(modelChats.filter(u => u.login === userlogin));
        return user ?? null;
    }

}
