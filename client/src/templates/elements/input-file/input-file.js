import { TemplatorVariables } from "/classes/templators/templator-variables";
import { TemplatorIf } from "/classes/templators/templator-if";
import template from "./input-file.tmpl.js";
import "./input-file.scss";

export class InputFile {
    constructor(options) {
        this._template = template;
        this.id = options.id;
        this.name = options.name ?? this.id;
        this.onchange = options.onchange ?? null
    }

    render() {
        const context = {
            id: this.id,
            name: this.name,
            onchange: this._onchange.bind(this)
        };

        const templatorIf = new TemplatorIf(this._template);
        this._template = templatorIf.compile(context);
        const templatorVariables = new TemplatorVariables(this._template);
        this._template = templatorVariables.compile(context);
        return this._template;
    }

    _onchange() {
        const inputGroup = document.getElementById(this.id);
        const input = inputGroup.querySelector('.input-file');
        const label = inputGroup.querySelector('label');
        const labelValue = label.innerText;

        let filename = '';
        if (input.name) {
            filename = input.value.split('\\').pop();
        }

        if (filename) {
            label.classList.add('has-file');
            label.querySelector('.filename').textContent = filename;
        } else {
            label.classList.remove('has-file');
            label.textContent = labelValue;
        }

        if (typeof this.onchange === "function") {
            this.onchange.call(input);
        }
    }
}