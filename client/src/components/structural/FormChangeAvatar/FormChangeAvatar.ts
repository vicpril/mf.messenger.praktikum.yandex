import template from "./FormChangeAvatar.tmpl";
import "./FormChangeAvatar.scss";
import { Avatar } from "../Avatar/Avatar";
import { InputFileGroup } from "../InputFileGroup/InputFileGroup";
import { $ } from "../../../utils/dom-abstraction";
import { AccountController } from "../../../controllers/AccountController/AccountController";

export const FormChangeAvatar = {
   name: "FormChangeAvatar",
   template: template,
   components: [Avatar, InputFileGroup],
   props: {
      account: {},
   },
   listeners: ["change", "submit"],
   subscribers: {},
   storeSubscribers: {},
   methods: {
      onChange(e: Event & { target: HTMLInputElement }) {
         if ($(e.target).hasClass("input-file")) {
            const img = document.getElementById(
               "user_info__avatar"
            ) as HTMLImageElement;
            const newSrc = e.target.value;
            // img.src = newSrc;
         }
      },
      onSubmit(e: Event & { target: HTMLFormElement }): void {
         if ($(e.target).hasClass("form__avatar_change")) {
            e.preventDefault();
            new AccountController(this).changeAvatar(new FormData(e.target));
         }
      },
   },
   beforeCreate() {
      this.props.account = AccountController.getAccount();
   },
};
