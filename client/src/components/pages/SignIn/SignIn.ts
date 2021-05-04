import template from "./SignIn.tmpl";
import "./SignIn.scss";
import { InputGroup } from "../../structural/InputGroup/InputGroup";
import { $ } from "../../../utils/dom-abstraction";
import {
   checkInputForm,
   prepareFormFields,
   verify,
} from "../../../core/validator/form";
import { Validators } from "../../../core/validator/validators";
import { Router } from "../../../core/router/Router";
// eslint-disable-next-line import/no-cycle
import { AuthController } from "../../../controllers/Auth/AuthController";
import { HideLoader, ShowLoader } from "../../../core/loader/loader";

const { required, minLength } = Validators;

export const SignIn = {
   name: "SignIn",
   template: template,
   components: [InputGroup],
   props: {
      pagename: "signin",
      form: {
         login: {
            value: "",
            validators: { required },
         },
         password: {
            value: "",
            validators: { required, minLength: minLength(3) },
            type: "password",
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

      onSubmit(e: Event & { target: HTMLFormElement }): void {
         if ($(e.target).hasClass("form__sign_in")) {
            e.preventDefault();
            new AuthController(this).login(new FormData(e.target));
         }
      },
      onClick(e: Event & { target: HTMLElement }) {
         if (e.target.dataset.action === "signup") {
            Router.navigate("signup");
         }
      },
   },
   beforePrepare() {
      this.props.fields = prepareFormFields(this.props.form);
   },
   afterInit() {
      window.ShowLoader = ShowLoader;
      window.HideLoader = HideLoader;
   },
};
