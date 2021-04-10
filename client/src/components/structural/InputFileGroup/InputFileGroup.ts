import template from "./InputFileGroup.tmpl";
import "./InputFileGroup.scss";
import { $, TDomAbstraction } from "../../../utils/dom-abstraction";

export const InputFileGroup = {
   name: "InputFileGroup",
   template: template,
   components: [],
   props: {
      id: "",
      name: "",
   },
   listeners: ["change"],
   subscribers: {},
   methods: {
      onChange(e: Event & { target: HTMLInputElement }) {
         if ($(e.target).hasClass("input-file")) {
            changeInput(this.$root);
         }
      },
   },
};

function changeInput($root: TDomAbstraction): void {
   const $input = $root.find(".input-file");
   const $label = $root.find("label");
   const labelValue = $label.$el.innerHTML;

   let filename = "";
   const input = $input.$el as HTMLInputElement;
   if (input.name) {
      filename = input.value.split("\\").pop() as string;
   }
   console.log("~ filename", filename);

   if (filename) {
      $label.addClass("has-file");
      $label.find(".filename").text(filename);
   } else {
      $label.removeClass("has-file");
      $label.html(labelValue);
   }
}
