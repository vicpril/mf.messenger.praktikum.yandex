import { Templator } from "/classes/templators/templator";
import template from "./main-container.tmpl.js";
import "./main-container.scss";
import { FormSendMessage } from "/templates/components/structural/form-send-message/form-send-message.js";
import { RightSidebar } from "/templates/components/structural/right-sidebar/right-sidebar";
import { sortByTime } from "/utils/sortMessages";
import { isUndefined } from "/utils/mydash/isUndefined";
import { BlockUserMessages } from "/templates/components/structural/block-user-messages/block-user-messages";
import { BlockDate } from "/templates/components/structural/block-date/block-date";
import { isEmpty } from "/utils/mydash/isEmpty";
import { get } from "/utils/mydash/get";

export class MainContainer {
    constructor(data) {
        this.template = template;
        this.account = data.account;
        this.chat = data.chat;
        this.current_user = data.current_user;

        if (
            this.current_user
            && !isEmpty(this.chat.data.messages)
        ) {
            const messages = sortByTime(this.chat.data.messages, 'asc');
            this.blocks = [...this._buildBlocksHistory(messages)];
        } else {
            this.blocks = [];
        }

    }

    render() {

        const context = {
            form_send_message: (new FormSendMessage()).render(),
            blocks: this.blocks.map(block => block.render()),
            current_user: this.current_user,
            right_sidebar: (new RightSidebar({})).render(),
        };

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }


    *_buildBlocksHistory(messages) {
        let i = 0;
        let block = null;

        while (i < messages.length) {
            let message = messages[i];

            // check date - may be create BlockDate - 
            if (isUndefined(messages[i - 1]) ||
                new Date(+message.time).toLocaleDateString() !==
                new Date(+messages[i - 1].time).toLocaleDateString()
            ) {
                let dateTime = new Date(+message.time);
                yield new BlockDate(dateTime.toLocaleDateString());
                block = this._createBlockUserMessages(message.user);
                yield block;
            }

            // create new block
            block = block ?? this._createBlockUserMessages(message.user);

            if (message.user === block.user.login) {
                // add message to list
                block._addMessage(message);
            } else {
                //return block & create new
                yield block;
                block = this._createBlockUserMessages(message.user);
                block._addMessage(message);
            }
            i++;
        }
        // yield block;
    }

    _createBlockUserMessages(login) {
        const isForeign = login !== this.account.login;
        const user = isForeign ? this.chat : this.account;
        return new BlockUserMessages(user, isForeign);
    }

}
