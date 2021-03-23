import { Templator } from "/classes/templators/templator";
import template from "./form-chat-search.tmpl.js";
import "./form-chat-search.scss";
import { InputCustom } from "/templates/elements/input/input";

export class FormChatSearch {
    constructor() {
        this.template = template;
    }

    render() {
        const context = {
            css: "search__wrapper",
            onsubmit: this._onsubmit,
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
        const form = document.getElementsByClassName("search__wrapper")[0];
        const formData = new FormData(form);
        const data = formData.getData()

        console.log('Search form data:', data);
    }

}