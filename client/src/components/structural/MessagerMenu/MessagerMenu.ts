import "./MessagerMenu.scss";

import { $ } from "../../../utils/dom-abstraction";
import { getFormData } from "../../../utils/pure-functions";
import template from "./MessagerMenu.tmpl";
import { Validators } from "../../../core/validator/validators";
import { useForm } from "../../../core/validator/form";

const { restrictedSymbols } = Validators;

export const MessagerMenu = {
   name: "MessagerMenu",
   template: template,
   components: [],
   props: {
      form: {
         message: {
            value: "",
            validators: { restrictedSymbols },
         },
      },
   },
   listeners: ["submit", "click", "keyup"],
   subscribers: {},
   methods: {
      onKeyup(e: Event & { target: HTMLInputElement }) {
         const $input = $(e.target);
         if ($input.hasClass("input__message")) {
            this.props.form.message.value = e.target.value;
            const control = useForm(this.props.form).controls;
            if (control && control.message.valid) {
               $input.removeClass("invalid");
            } else {
               $input.addClass("invalid");
            }
         }
      },
      onSubmit(e: Event & { target: Element }): void {
         const $input = $(e.target);
         if ($input.hasClass("messager__form")) {
            e.preventDefault();

            const control = useForm(this.props.form).controls;
            if (control && !control.message.valid) {
               $input.addClass("invalid");
               if (control.message.errors) {
                  alert(control.message.errors.restrictedSymbols.message);
               }
            }

            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data = getFormData(formData);

            console.log("Send form data:", data);
         }
      },
      onClick(e: Event & { target: Element }): void {
         if (
            $(e.target).hasClass("button__attach") ||
            $(e.target).hasClass("fa-paperclip")
         ) {
            console.log("Yeah! This attaches something...");
         }
      },
   },
};
