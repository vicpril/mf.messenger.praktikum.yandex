import { Templator } from "/classes/templators/templator";
import template from "./left-sidebar.tmpl.js";
import "./left-sidebar.scss";
import { Chat } from "../chat/chat.js";
import { FormChatSearch } from "../form-chat-search/form-chat-search.js";

export class LeftSidebar {
    constructor(account, users) {
        this.template = template;
        this.account = account;
        this.users = users;
        this.current_user = this.users[1].login;
    }

    render() {
        const chats = this.users.map(user => {
            return (new Chat(user, this.current_user === user.login)).render();
        });
        const context = {
            account: (new Chat(this.account, false, true)).render(),
            chats: chats,
            current_user: this.users[2].login,

            form_search: (new FormChatSearch()).render()
        };

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }
}
