import template from "./FormPasswordChange.tmpl";
import "./FormPasswordChange.scss";
import { AppService } from "../../../services/AppService";
import { InputGroup } from "../../structural/InputGroup/InputGroup";
import { $ } from "../../../utils/dom-abstraction";
import { Validators } from "../../../core/validator/validators";
import {
   checkInputForm,
   prepareFormFields,
   verify,
} from "../../../core/validator/form";
import { AccountController } from "../../../controllers/AccountController/AccountController";

const { required, same } = Validators;

export const FormPasswordChange = {
   name: "FormPasswordChange",
   template: template,
   components: [InputGroup],
   props: {
      account: AppService.getAccount(),
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
         if ($(e.target).hasClass("form__change_password")) {
            e.preventDefault();
            if (verify(this)()) {
               new AccountController(this).changePassword(
                  new FormData(e.target)
               );
            }
         }
      },
   },
   beforePrepare() {
      this.props.form = {
         old_password: {
            value: "",
            type: "password",
            validators: {
               required,
               same: same(this.props.account.password),
            },
            errorReason: {
               same: "This field is not equal with your current password",
            },
         },
         new_password: {
            value: "",
            type: "password",
            validators: { required },
         },
         confirm_new_password: {
            value: "",
            type: "password",
            validators: {
               required,
               same: same("#new_password", true),
            },
            errorReason: {
               same: "This field is not equal with New Password",
            },
         },
      };
   },
   beforeCreate() {
      this.props.fields = prepareFormFields(this.props.form);
   },
};
