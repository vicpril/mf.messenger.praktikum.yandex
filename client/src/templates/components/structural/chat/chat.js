import { Templator } from "/classes/templators/templator";
import template from "./chat.tmpl.js";
import "./chat.scss";
import { Avatar } from "/templates/elements/avatar/avatar";
import { ButtonCustom } from "/templates/elements/button/button.js";
import { Counter } from "/templates/elements/counter/counter";
import { toggleRightSidebar } from "/templates/components/structural/right-sidebar/right-sidebar";
import { sortByTime } from "/utils/sortMessages";
import { DateCustom } from "../../../../utils/mydash/date.js";

export class Chat {
    constructor(user, isCurrent = false) {
        this.template = template;
        this.user = user;
        this.isCurrent = isCurrent;
    }

    render() {
        const sortedMessages = this.user.data ? sortByTime(this.user.data.messages) : [];
        const lastMessage = sortedMessages ? sortedMessages[0] : null;
        let lastMessageContent = '';
        let lastMessageDate = '';
        if (this.isCurrent) {
            console.log(lastMessage);
        }
        if (lastMessage) {
            lastMessageContent = lastMessage.content;
            lastMessageDate = (new DateCustom(+lastMessage.time)).getDateFormatted;
        }

        const context = {
            css: "",
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
            display_name: this.user.display_name,
            avatar: (new ButtonCustom({
                css: "button_empty_primary",
                prevent_action: "event.stopPropagation();",
                title: (new Avatar({
                    css: "user__avatar pulse",
                    src: this.user.avatar
                }, this.user.login)).render(),
                onclick: () => { document.location.href = `/contact-info.html?user=${this.user.login}` }
            })).render()

        }

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }

    _onclick() {
        document.location.href = `/?user=${this.user.login}`;
    }


}