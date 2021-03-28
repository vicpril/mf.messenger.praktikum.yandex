import { Templator } from "/classes/templators/templator";
import { ButtonCustom } from "/templates/elements/button/button";
import template from "./right-sidebar.tmpl.js";
import "./right-sidebar.scss";
import { AccountInfoContent } from "/templates/components/pages-content/account-info/account-info.js";
import { ContactInfoContent } from "/templates/components/pages-content/contact-info/contact-info.js";
import { FormAvatarChangeContent } from "/templates/components/pages-content/form-avatar-change/form-avatar-change.js";
import { FormAccountSettingsContent } from "/templates/components/pages-content/form-account-settings/form-account-settings.js";
import { FormPasswordChangeContent } from "/templates/components/pages-content/form-password-change/form-password-change.js";

export class RightSidebar {
    constructor(page = null) {
        this.template = template;
        this.page = page
    }

    render() {
        const content = this.getRightSidebarContent(this.page)

        const context = {
            button_close: (new ButtonCustom({
                css: "button__close button_primary",
                type: "button",
                title: "&times;",
                onclick: closeRightSidebar
            })).render(),
            content: content
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


    getRightSidebarContent(page = null) {

        /**
         * Switch pages for printing html
         * 
         *      This needs only for Sprint 1
         */

        if (page) {
            window["openSidebar"] = openRightSidebar;
            const body = document.getElementsByTagName('body')[0];
            const script = document.createElement('script');
            script.textContent = (() => {
                document.addEventListener('DOMContentLoaded', window.openSidebar);
            })()
            body.insertAdjacentElement('beforeend', script);
        }

        switch (page) {
            case "avatar-edit":
                return (new FormAvatarChangeContent()).render();
            case "settings-edit":
                return (new FormAccountSettingsContent()).render();
            case "password-change":
                return (new FormPasswordChangeContent()).render();
            case "contact-info":
                return (new ContactInfoContent()).render();
            case "account":
                return (new AccountInfoContent()).render();
            default:
        }

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