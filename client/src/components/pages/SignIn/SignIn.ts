import template from "./SignIn.tmpl";
import "./SignIn.scss";
import { AppService } from "../../../services/AppService";
import {
   InputGroup,
   TInputGroup,
} from "../../structural/InputGroup/InputGroup";
import { getFormData, lodashToStr } from "../../../utils/pure-functions";
import { $ } from "../../../utils/dom-abstraction";

export const SignIn = {
   name: "SignIn",
   template: template,
   components: [InputGroup],
   props: {
      fields: ["login", "password"],
   },
   listeners: ["click", "submit"],
   subscribers: {},
   methods: {
      onSubmit(e: Event & { target: Element }): void {
         if ($(e.target).hasClass("form__sign_in")) {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data = getFormData(formData);

            console.log("Form SignIn:", data);
         }
      },
      onClick(e: Event & { target: HTMLElement }) {
         if (e.target.dataset.action === "signup") {
            document.location.href = "/signup.html";
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
               type: key === "password" ? "password" : "text",
            } as TInputGroup)
      );
   },
};
