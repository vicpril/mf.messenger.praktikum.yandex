import template from "./SignUp.tmpl";
import "./SignUp.scss";
import { InputGroup } from "../../structural/InputGroup/InputGroup";
import { $ } from "../../../utils/dom-abstraction";
import { Validators } from "../../../core/validator/validators";
import {
   checkInputForm,
   prepareFormFields,
   verify,
} from "../../../core/validator/form";
import { Router } from "../../../core/router/Router";
// eslint-disable-next-line import/no-cycle
import { AuthController } from "../../../controllers/Auth/AuthController";

const { required, minLength, email } = Validators;

export const SignUp = {
   name: "SignUp",
   template: template,
   components: [InputGroup],
   props: {
      pagename: "signup",
      form: {
         login: {
            value: "",
            validators: { required },
         },
         email: {
            value: "",
            validators: { required, email },
         },
         first_name: {
            value: "",
            validators: { required },
         },
         second_name: {
            value: "",
            validators: { required },
         },
         password: {
            value: "",
            validators: { required, minLength: minLength(3) },
            type: "password",
         },
         phone: {
            value: "",
            validators: { required },
         },
      },
      form_control: {},
   },
   listeners: ["submit", "blur", "click"],
   subscribers: {},
   methods: {
      onBlur(e: Event & { target: HTMLElement }) {
         if (checkInputForm(e.target, this.props.form)) {
            verify(this)(e.target);
         }
      },

      onSubmit(e: Event & { target: HTMLFormElement }): void {
         if ($(e.target).hasClass("form__sign_up")) {
            e.preventDefault();
            new AuthController(this).register(new FormData(e.target));
         }
      },
      onClick(e: Event & { target: HTMLElement }) {
         if (e.target.dataset.action === "to-signin") {
            e.preventDefault();
            Router.navigate("signin");
         }
      },
   },
   beforeCreate() {
      this.props.fields = prepareFormFields(this.props.form);
   },
};
