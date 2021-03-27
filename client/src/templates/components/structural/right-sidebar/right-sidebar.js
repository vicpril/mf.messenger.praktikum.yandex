import { Templator } from "/classes/templators/templator";
import { ButtonCustom } from "/templates/elements/button/button";
import template from "./right-sidebar.tmpl.js";
import "./right-sidebar.scss";
import { AccountInfoContent } from "/templates/components/pages-content/account-info/account-info.js";
import { ContactInfoContent } from "/templates/components/pages-content/contact-info/contact-info.js";
import { FormAccountSettingsContent } from "/templates/components/pages-content/form-account-settings/form-account-settings.js";
import { FormPasswordChangeContent } from "/templates/components/pages-content/form-password-change/form-password-change.js";

export class RightSidebar {
    constructor(content) {
        this.template = template;
        this.content = content;

    }

    render() {

        const context = {
            button_close: (new ButtonCustom({
                css: "button__close button_primary",
                type: "button",
                title: "&times;",
                onclick: closeRightSidebar
            })).render(),
            content: this.getRightSidebarContent()
        };

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }

    renderContent() {
        if (typeof this.content === 'string') {
            return this.content;
        } else {
            if (typeof this.content.render !== 'undefined')
                return this.content.render();
        }
        return '';
    }


    getRightSidebarContent() {
        // return (new AccountInfoContent()).render();
        // return (new FormAccountSettingsContent()).render();
        // return (new FormPasswordChangeContent()).render();
        return (new ContactInfoContent()).render();
    }
}

export function closeRightSidebar() {
    const main = document.querySelector('main');
    main.classList.add("right_sidebar__close");
}

export function openRightSidebar() {
    const main = document.querySelector('main');
    main.classList.remove("right_sidebar__close");
}

export function toggleRightSidebar() {
    const main = document.querySelector('main');
    if (main.classList.contains("right_sidebar__close")) {
        main.classList.remove("right_sidebar__close");
    } else {
        main.classList.add("right_sidebar__close");
    }
}