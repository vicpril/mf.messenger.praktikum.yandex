import { Templator } from "/classes/templators/templator";
import template from "./chat-account.tmpl.js";
import "./chat-account.scss";
import { Avatar } from "/templates/elements/avatar/avatar";
import { ButtonCustom } from "/templates/elements/button/button.js";
import { Counter } from "/templates/elements/counter/counter";
import { toggleRightSidebar } from "/templates/components/structural/right-sidebar/right-sidebar";
import { sortByTime } from "/utils/sortMessages";

export class ChatAccount {
    constructor(user) {
        this.template = template;
        this.user = user;
    }

    render() {

        const context = {
            is_account: true,
            css: "account__user",
            btn_settings: (new ButtonCustom({
                css: "button button__user_settings button_empty_primary",
                title: '<i class="fas fa-ellipsis-v"></i>',
                onclick: () => { document.location.href = "/account.html" },
            })).render(),
            display_name: this.user.display_name,
            avatar: (new Avatar({
                css: "user__avatar",
                src: this.user.avatar
            }, this.user.login)).render(),
        }

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }

    _onclick() {
        document.location.href = `/?user=${this.user.login}`;
    }


}