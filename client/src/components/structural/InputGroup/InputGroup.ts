import template from "./InputGroup.tmpl";
import "./InputGroup.scss";
import { $ } from "../../../utils/dom-abstraction";

export const InputGroup = {
   name: "InputGroup",
   template: template,
   components: [],
   props: {
      options: {},
      property: {},
      value: "",
   },
   listeners: ["keyup"],
   subscribers: {},
   methods: {
      onKeyup(e: Event & { target: HTMLInputElement }) {
         if ($(e.target).hasId(this.props.options.id)) {
            this.props.property.value = e.target.value;
            this.value = e.target.value;
         }
      },
   },
   beforeCreate() {
      this.props.value = this.props.property.value;
   },
};

export type TInputGroup = {
   title?: string;
   cssGroupe?: string;
   id?: string;
   css?: string;
   type?: string;
   name?: string;
   placeholder?: string;
   required?: boolean;
   errorReason?: {
      [error: string]: string;
   };
};
