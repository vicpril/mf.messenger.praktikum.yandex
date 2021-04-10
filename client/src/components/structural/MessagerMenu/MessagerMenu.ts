import "./MessagerMenu.scss";

import { $ } from "../../../utils/dom-abstraction";
import { getFormData } from "../../../utils/pure-functions";
import template from "./MessagerMenu.tmpl";

export const MessagerMenu = {
   name: "MessagerMenu",
   template: template,
   components: [],
   props: {},
   listeners: ["submit", "click"],
   subscribers: {},
   methods: {
      onSubmit(e: Event & { target: Element }): void {
         if ($(e.target).hasClass("messager__form")) {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data = getFormData(formData);

            console.log("Send form data:", data);
         }
      },
      onClick(e: Event & { target: Element }): void {
         if (
            $(e.target).hasClass("button__attach") ||
            $(e.target).hasClass("fa-paperclip")
         ) {
            console.log("Yeah! This attaches something...");
         }
      },
   },
};
