import { Templator } from "/classes/templators/templator";
import { Avatar } from "/templates/elements/avatar/avatar";
import template from "./chat.tmpl.js";
import "./chat.scss";
import { sortByTime } from "/utils/sortMessages";
import { ButtonCustom } from "../../elements/button/button.js";
import { Counter } from "/templates/elements/counter/counter";

export class Chat {
    constructor(user, isCurrent = false, isAccount = false) {
        this.template = template;
        this.isAccount = isAccount;
        this.user = user;
        this.isCurrent = isCurrent;
    }

    render() {

        const advanced_options = this.isAccount
            ? this._getAccountContext()
            : this._getUserContext();
        const context = Object.assign(
            advanced_options,
            {
                display_name: this.user.display_name,
                avatar: (new Avatar({
                    css: "user__avatar",
                    src: this.user.avatar
                }, this.user.login)).render(),
            }
        )

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }

    _getAccountContext() {
        return {
            is_account: true,
            css: "account__user",

            btn_settings: (new ButtonCustom({
                css: "button button__user_settings",
                title: '<i class="fas fa-ellipsis-v"></i>',
                onclick: () => { document.location.href = '/account/' }
            })).render()
        }
    }

    _getUserContext() {
        const sortedMessages = this.user.data ? sortByTime(this.user.data.messages) : [];
        const lastMessage = sortedMessages ? sortedMessages[0] : null;
        let lastMessageContent = '';
        let lastMessageDate = '';
        if (lastMessage) {
            lastMessageContent = lastMessage.content;
            lastMessageDate = (new Date(+lastMessage.time)).toLocaleDateString();
        }

        return {
            css: "",
            is_account: false,
            is_current: this.isCurrent,
            last_message: lastMessageContent,
            last_message_date: lastMessageDate,
            counter: (new Counter({
                css: "unread_messages_counter",
                value: sortedMessages
                    .filter(m => m.unread)
                    .length
            })).render(),
            onclick: () => { document.location.href = `/?user=${this.user.login}` },
        }
    }

    _onclick() {
        document.location.href = `/?user=${this.user.login}`;
    }


}