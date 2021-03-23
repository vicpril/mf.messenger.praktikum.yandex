import { Templator } from "/classes/templators/templator";
import { Avatar } from "/templates/elements/avatar/avatar";
import template from "./chat.tmpl.js";
import "./chat.scss";
import { sortByTime } from "/utils/sortMessages";
import { ButtonCustom } from "../../elements/button/button.js";

export class Chat {
    constructor(user, isCurrent = false, isAccount = false) {
        this.template = template;
        this.isAccount = isAccount;
        this.user = user;
        this.isCurrent = isCurrent;
    }

    render() {

        const context = this.isAccount
            ? this._getAccountContext()
            : this._getUserContext();

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }

    _getAccountContext() {
        return {
            is_account: true,
            css: "account__user",
            display_name: this.user.display_name,
            avatar: (new Avatar({
                css: "user__avatar",
                src: this.user.avatar
            }, this.user.login)).render(),
            btn_settings: (new ButtonCustom({
                css: "button button__user_settings",
                title: '<i class="fas fa-ellipsis-v"></i>',
                onclick: () => { document.location.href = '/account/' }
            })).render()
        }
    }

    _getUserContext() {
        const sortedMessages = this.user.data ? sortByTime(this.user.data.messages) : [];
        const lastMessage = sortedMessages[0];
        return {
            css: "",
            is_account: false,
            display_name: this.user.display_name,
            is_current: this.isCurrent,
            last_message: lastMessage.content,
            last_message_date: (new Date(+lastMessage.time)).toLocaleDateString(),
            unread_count: sortedMessages
                .filter(m => m.unread)
                .length,
            avatar: (new Avatar({
                css: "user__avatar",
                src: this.user.avatar
            }, this.user.login)).render()
        }
    }


}