import template from "./SignUp.tmpl";
import "./SignUp.scss";
import {
   InputGroup,
   TInputGroup,
} from "../../structural/InputGroup/InputGroup";
import { getFormData, lodashToStr } from "../../../utils/pure-functions";
import { $ } from "../../../utils/dom-abstraction";

export const SignUp = {
   name: "SignUp",
   template: template,
   components: [InputGroup],
   props: {
      fields: [
         "login",
         "email",
         "first_name",
         "last_name",
         "password",
         "phone",
      ],
   },
   listeners: ["submit"],
   subscribers: {},
   methods: {
      onSubmit(e: Event & { target: Element }): void {
         if ($(e.target).hasClass("form__sign_up")) {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data = getFormData(formData);

            console.log("Form SignUp:", data);
         }
      },
   },
   beforeCreate() {
      this.props.fields = this.props.fields.map(
         (key: string) =>
            ({
               title: lodashToStr(key),
               id: key,
               name: key,
               type:
                  key === "password"
                     ? "password"
                     : key === "email"
                     ? "email"
                     : "text",
            } as TInputGroup)
      );
   },
};
