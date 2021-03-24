import { Templator } from "/classes/templators/templator";
import template from "./form-chat-search.tmpl.js";
import "./form-chat-search.scss";
import { InputCustom } from "/templates/elements/input/input";

export class FormChatSearch {
    constructor() {
        this.template = template;
        this.css = "search__wrapper";
    }

    render() {
        const context = {
            css: this.css,
            onsubmit: this._onsubmit.bind(this),
            prevent_action: "event.preventDefault();",
            content: (new InputCustom({
                css: "input input__search_chats",
                name: "search",
                value: "",
                placeholder: "Search"
            })).render(),
        };

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }

    _onsubmit() {
        const form = document.getElementsByClassName(this.css)[0];
        const formData = new FormData(form);
        const data = formData.getData()

        console.log('Send form data:', data);
    }

}