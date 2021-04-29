import {
   checkInputForm,
   prepareFormFields,
   verify,
} from "../../../core/validator/form";
import { Validators } from "../../../core/validator/validators";
import { $ } from "../../../utils/dom-abstraction";
import { InputGroup } from "../InputGroup/InputGroup";
import "./ModalNewChat.scss";

import template from "./ModalNewChat.tmpl";

const { required, minLength } = Validators;

export const ModalNewChat = {
   name: "ModalNewChat",
   template: template,
   components: [InputGroup],
   props: {
      form: {},
      form_control: {},
   },
   listeners: ["click", "blur"],
   subscribers: {
      ShowNewChatModal: showModal,
   },
   methods: {
      onBlur(e: Event & { target: HTMLElement }) {
         if (checkInputForm(e.target, this.props.form)) {
            verify(this)(e.target);
         }
      },
      onClick(e: Event & { target: HTMLElement }) {
         if (
            $(e.target).hasClass("modal_new_chat__overlay") ||
            e.target.dataset.action === "cancel"
         ) {
            hideModal();
            setTimeout(() => {
               this.$emit(this.EVENTS.UPDATE);
            }, 300);
         }
      },
   },
   beforePrepare() {
      this.props.form = {
         title: {
            value: "",
            validators: {
               required,
               minLength: minLength(3),
            },
         },
      };
   },
   beforeCreate() {
      this.props.fields = prepareFormFields(this.props.form);
   },
};

function showModal() {
   const $modal = $(".modal_new_chat");
   $modal.addClass("open");
}

function hideModal() {
   const $modal = $(".modal_new_chat");
   $modal.removeClass("open");
}
