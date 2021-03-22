import { Templator } from "/classes/templators/templator";
import { TemplatorIf } from "/classes/templators/templator-if";
import { TemplatorFor } from "/classes/templators/templator-for";
import template from "./left-sidebar.tmpl.js";
import "./left-sidebar.scss";
import { InputCustom } from "/templates/elements/input/input";
import { ButtonCustom } from "/templates/elements/button/button";
import { Avatar } from "/templates/elements/avatar/avatar";
import { Chat } from "../chat/chat.js";

export class LeftSidebar {
    constructor(account, users) {
        this.template = template;
        this.account = account;
        this.users = users;
        this.current_user = this.users[2].login;
    }

    render() {
        const chats = this.users.map(user => {
            return (new Chat(user, this.current_user === user.login)).render();
        });
        const context = {
            account: (new Chat(this.account, false, true)).render(),
            chats: chats,
            current_user: this.users[2].login,
            input_search: (new InputCustom({
                css: "input input__search_chats",
                name: "search",
                value: "",
                placeholder: "Search"
            })).render()
        };

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }
}
