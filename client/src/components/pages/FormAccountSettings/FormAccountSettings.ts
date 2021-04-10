import template from "./FormAccountSettings.tmpl";
import "./FormAccountSettings.scss";
import { AppService } from "../../../services/AppService";
import {
   InputGroup,
   TInputGroup,
} from "../../structural/InputGroup/InputGroup";
import { getFormData, lodashToStr } from "../../../utils/pure-functions";
import { $ } from "../../../utils/dom-abstraction";

export const FormAccountSettings = {
   name: "FormAccountSettings",
   template: template,
   components: [InputGroup],
   props: {
      account: AppService.getAccount(),
      fields: ["login", "email", "first_name", "last_name", "display_name"],
   },
   listeners: ["click", "submit"],
   subscribers: {},
   methods: {
      onSubmit(e: Event & { target: Element }): void {
         if ($(e.target).hasClass("form__account_settings")) {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data = getFormData(formData);

            console.log("Form account settings data:", data);
         }
      },
      onClick(e: Event & { target: HTMLElement }) {
         if (e.target.dataset.action === "cancel") {
            document.location.href = "/account-info.html";
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
               type: key === "email" ? "email" : "text",
               value: this.props.account[key],
            } as TInputGroup)
      );
   },
};
