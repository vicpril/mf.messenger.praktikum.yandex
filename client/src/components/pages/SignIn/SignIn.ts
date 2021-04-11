import template from "./SignIn.tmpl";
import "./SignIn.scss";
import {
   InputGroup,
   TInputGroup,
} from "../../structural/InputGroup/InputGroup";
import { lodashToStr } from "../../../utils/pure-functions";
import { $ } from "../../../utils/dom-abstraction";
import { checkInputForm, verify } from "../../../core/validator/form";
import { Validators } from "../../../core/validator/validators";

const { required, minLength } = Validators;

export const SignIn = {
   name: "SignIn",
   template: template,
   components: [InputGroup],
   props: {
      form: {
         login: {
            value: "",
            validators: { required },
         },
         password: {
            value: "",
            validators: { required, minLength: minLength(3) },
         },
      },
      form_control: {},
   },
   listeners: ["click", "submit", "blur"],
   subscribers: {},
   methods: {
      onBlur(e: Event & { target: HTMLElement }) {
         if (checkInputForm(e.target, this.props.form)) {
            verify(this)(e.target);
         }
      },

      onSubmit(e: Event & { target: Element }): void {
         if ($(e.target).hasClass("form__sign_in")) {
            e.preventDefault();
            verify(this)();
            console.log("Form SignIn:", this.props.form);
         }
      },
      onClick(e: Event & { target: HTMLElement }) {
         if (e.target.dataset.action === "signup") {
            document.location.href = "/signup.html";
         }
      },
   },
   beforePrepare() {
      this.props.fields = Object.getOwnPropertyNames(this.props.form).map(
         (key: string) =>
            ({
               title: lodashToStr(key),
               id: key,
               name: key,
               type: key === "password" ? "password" : "text",
            } as TInputGroup)
      );
   },
};
