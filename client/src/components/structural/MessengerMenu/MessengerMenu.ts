import "./MessengerMenu.scss";

import { $ } from "../../../utils/dom-abstraction";
import { getFormData } from "../../../utils/pure-functions";
import template from "./MessengerMenu.tmpl";
import { Validators } from "../../../core/validator/validators";
import { useForm } from "../../../core/validator/form";
import { ChatsController } from "../../../controllers/Chats/ChatsController";
import { AccountController } from "../../../controllers/AccountController/AccountController";
import { TUser } from "../../../models/User";
import { YPSocket } from "../../../core/connections/YPSocket";

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
            const { message } = getFormData(formData);

            // const userId = (AccountController.getAccount() as TUser).id;
            // const chatId = ChatsController.getSelectedChatId();

            const connection = YPSocket.getInstance();

            connection.send(message);

            console.log("TODO Send form data:", message);
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
