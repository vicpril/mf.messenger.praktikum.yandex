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
import { Messager } from "/templates/components/structural/messager/messager.js";

export class MainContainer {
    constructor(data, pageSidebar = null) {
        this.template = template;
        // this.account = data.account;
        // this.chat = data.chat;

        this.current_user = data.current_user;
        this.pageSidebar = pageSidebar;

        this.messager = (this.current_user && !isEmpty(data.chat.data.messages))
            ? (new Messager(data)).render()
            : "";
    }

    render() {

        const context = {
            form_send_message: (new FormSendMessage()).render(),
            current_user: this.current_user,
            right_sidebar: (new RightSidebar(this.pageSidebar)).render(),
            messager: this.messager
        };

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }




}
