import template from "./FormChangeAvatar.tmpl";
import "./FormChangeAvatar.scss";
import { Avatar } from "../../structural/Avatar/Avatar";
import { AppService } from "../../../services/AppService";
import { InputFileGroup } from "../../structural/InputFileGroup/InputFileGroup";
import { $ } from "../../../utils/dom-abstraction";
import { getFormData } from "../../../utils/pure-functions";

export const FormChangeAvatar = {
   name: "FormChangeAvatar",
   template: template,
   components: [Avatar, InputFileGroup],
   props: {
      account: AppService.getAccount(),
   },
   listeners: ["change", "submit"],
   subscribers: {},
   methods: {
      onChange(e: Event & { target: HTMLInputElement }) {
         if ($(e.target).hasClass("input-file")) {
            const img = document.getElementById(
               "user_info__avatar"
            ) as HTMLImageElement;
            const newSrc = e.target.value;
            img.src = newSrc;
         }
      },
      onSubmit(e: Event & { target: Element }): void {
         if ($(e.target).hasClass("form__avatar_change")) {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data = getFormData(formData);

            console.log("Change Avatar data:", data);
         }
      },
   },
};
