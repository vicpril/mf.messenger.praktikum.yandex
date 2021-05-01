import "./MessengerMenu.scss";

import { $ } from "../../../utils/dom-abstraction";
import { getFormData } from "../../../utils/pure-functions";
import template from "./MessengerMenu.tmpl";
import { Validators } from "../../../core/validator/validators";
import { useForm } from "../../../core/validator/form";
import { YPSocket } from "../../../core/connections/YPSocket";
import { MessengerController } from "../../../controllers/Messenger/MessengerController";

const { restrictedSymbols } = Validators;

export const MessengerMenu = {
   name: "MessengerMenu",
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
      onSubmit(e: Event & { target: HTMLFormElement }): void {
         const $form = $(e.target);
         if ($form.hasClass("messenger__form")) {
            e.preventDefault();

            const control = useForm(this.props.form).controls;
            if (control && !control.message.valid) {
               $form.addClass("invalid");
               if (control.message.errors) {
                  alert(control.message.errors.restrictedSymbols.message);
                  return;
               }
            }

            const formData = new FormData(e.target);

            new MessengerController(this).sendTextMessage(formData);

            $(e.target).find("input.input__message").val("");
         }
      },
      onClick(e: Event & { target: Element }): void {
         if (
            $(e.target).hasClass("button__attach") ||
            $(e.target).hasClass("fa-paperclip")
         ) {
            console.log("TODO This attaches something...");
         }
      },
   },
};
