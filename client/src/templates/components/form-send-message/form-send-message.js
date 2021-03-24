import { Templator } from "/classes/templators/templator";
import template from "./form-send-message.tmpl.js";
import "./form-send-message.scss";
import { InputCustom } from "/templates/elements/input/input";
import { ButtonCustom } from "/templates/elements/button/button";

export class FormSendMessage {
    constructor() {
        this.template = template;
        this.css = "messager__form";
    }

    render() {
        const context = {
            css: this.css,
            onsubmit: this._onsubmit.bind(this),
            prevent_action: "event.preventDefault();",
            content: [
                (new ButtonCustom({
                    css: "button__attach",
                    type: "button",
                    title: `<i class="fas fa-paperclip fa-2x"></i>`,
                    onclick: this._attach
                })).render(),
                (new InputCustom({
                    css: "hidden",
                    name: "attachment",
                    value: "",
                })).render(),
                (new InputCustom({
                    css: "input__message",
                    name: "message",
                    value: "",
                    placeholder: "Type a new message ..."
                })).render(),
                (new ButtonCustom({
                    css: "button__submit",
                    title: `Send`,
                })).render(),
            ].join('')
        };

        const tepmlator = new Templator(this.template);
        return tepmlator.compile(context);
    }

    _onsubmit() {

        const form = document.getElementsByClassName(this.css)[0];
        const formData = new FormData(form);
        const data = formData.getData()

        console.log('Search form data:', data);
    }

    _attach() {
        console.log('Yeah! This attaches something...');
    }

}