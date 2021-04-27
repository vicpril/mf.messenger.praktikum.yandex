import template from "./FormAccountSettings.tmpl";
import "./FormAccountSettings.scss";
import { AppService } from "../../../services/AppService";
import { InputGroup } from "../InputGroup/InputGroup";
import { $ } from "../../../utils/dom-abstraction";
import {
   checkInputForm,
   prepareFormFields,
   verify,
} from "../../../core/validator/form";
import { Validators } from "../../../core/validator/validators";
import { AccountController } from "../../../controllers/AccountController/AccountController";

const { required, email, minLength } = Validators;

export const FormAccountSettings = {
   name: "FormAccountSettings",
   template: template,
   components: [InputGroup],
   props: {
      account: {},
      form: {},
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

      onSubmit(e: Event & { target: HTMLFormElement }): void {
         if ($(e.target).hasClass("form__account_settings")) {
            e.preventDefault();
            new AccountController(this).update(new FormData(e.target));
         }
      },
   },
   beforePrepare() {
      this.props.account = AccountController.getAccount();
      this.props.form = {
         login: {
            value: this.props.account.login,
            validators: { required },
         },
         email: {
            value: this.props.account.email,
            validators: { required, email },
         },
         first_name: {
            value: this.props.account.first_name,
            validators: { required },
         },
         second_name: {
            value: this.props.account.second_name,
            validators: { required },
         },
         display_name: {
            value: this.props.account.display_name,
            validators: { required },
         },
         phone: {
            value: this.props.account.phone,
            validators: { required, minLength: minLength(4) },
         },
      };
   },
   beforeCreate() {
      this.props.fields = prepareFormFields(this.props.form);
   },
};
