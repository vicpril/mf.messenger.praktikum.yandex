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

const { required, minLength, email } = Validators;

export const SignUp = {
   name: "SignUp",
   template: template,
   components: [InputGroup],
   props: {
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
         last_name: {
            value: "",
            validators: { required },
         },
         password: {
            value: "",
            validators: { required, minLength: minLength(5) },
         },
         phone: {
            value: "",
            validators: { required },
         },
      },
      form_control: {},
   },
   listeners: ["submit", "blur"],
   subscribers: {},
   methods: {
      onBlur(e: Event & { target: HTMLElement }) {
         if (checkInputForm(e.target, this.props.form)) {
            verify(this)(e.target);
         }
      },

      onSubmit(e: Event & { target: Element }): void {
         if ($(e.target).hasClass("form__sign_up")) {
            e.preventDefault();
            verify(this)();
            console.log("Form SignUp:", this.props.form);
         }
      },
   },
   beforeCreate() {
      this.props.fields = prepareFormFields(this.props.form);
   },
};
