import { Templator } from "/classes/templators/templator";
import template from "./block-user-messages.tmpl.js";
import "./block-user-messages.scss";
import { Avatar } from "/templates/elements/avatar/avatar";

export class BlockUserMessages {
    constructor(user, isForeign) {
        this.template = template;
        this.user = user
        this.isForeign = isForeign
        this.messages = [];
    }

    render() {
        const context = {
            user: this.user,
            is_foreign: this.isForeign,
            messages: this.messages.map(mapMessageTime),
            avatar: (new Avatar({
                css: "user__avatar",
                src: this.user.avatar
            }, this.user.login)).render(),
        }

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }

    _addMessage(message) {
        this.messages.push(message);
    }

}

const mapMessageTime = (message) => {
    message.time = (new Date(+message.time)).getTimeFormatted();
    return message;
}