import "./MessengerMenu.scss";

import { $ } from "../../../utils/dom-abstraction";
import template from "./MessengerMenu.tmpl";
import { Validators } from "../../../core/validator/validators";
import { useForm } from "../../../core/validator/form";
import { MessengerController } from "../../../controllers/Messenger/MessengerController";
import * as actions from "../../../core/store/actions";
import { Store } from "../../../core/store/Store";
import { MessengerFileAttach } from "../MessengerFileAttach/MessengerFileAttach";
import { ResourcesController } from "../../../controllers/Resource/ResourcesController";

const { restrictedSymbols } = Validators;

export const MessengerMenu = {
   name: "MessengerMenu",
   template: template,
   components: [MessengerFileAttach],
   props: {
      form: {
         message: {
            value: "",
            validators: { restrictedSymbols },
         },
      },
   },
   listeners: ["submit", "change", "keyup"],
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
      onChange(e: Event & { target: HTMLInputElement }): void {
         if ($(e.target).hasId("attachment")) {
            const input = e.target;
            if (input.files && input.files.length > 0) {
               const filename = input.value.split("\\").pop() as string;
               const formData = new FormData();
               formData.append("resource", input.files[0], filename);
               new ResourcesController(this).uploadFile(formData);
            }

            // const status = Store.get().getState().fileAttachForm?.status;
            // if (status === "open") {
            //    this.$dispatch(actions.fileAttachCloseForm());
            // } else {
            //    this.$dispatch(actions.fileAttachOpenForm());
            // }
         }
      },
   },
};
