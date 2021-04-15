import template from "./FormPasswordChange.tmpl";
import "./FormPasswordChange.scss";
import { AppService } from "../../../services/AppService";
import {
   InputGroup,
   TInputGroup,
} from "../../structural/InputGroup/InputGroup";
import { getFormData, lodashToStr } from "../../../utils/pure-functions";
import { $ } from "../../../utils/dom-abstraction";

export const FormPasswordChange = {
   name: "FormPasswordChange",
   template: template,
   components: [InputGroup],
   props: {
      account: AppService.getAccount(),
      fields: ["old_password", "new_password", "confirm_new_password"],
   },
   listeners: ["click", "submit"],
   subscribers: {},
   methods: {
      onSubmit(e: Event & { target: Element }): void {
         if ($(e.target).hasClass("form__change_password")) {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data = getFormData(formData);

            console.log("Change password form settings data:", data);
         }
      },
      onClick(e: Event & { target: HTMLElement }) {
         if (e.target.dataset.action === "cancel") {
            document.location.href = "/account.html";
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
               type: "password",
            } as TInputGroup)
      );
   },
};
