import template from "./InputGroup.tmpl";
import "./InputGroup.scss";

export const InputGroup = {
   name: "InputGroup",
   template: template,
   components: [],
   props: {
      obj: {},
   },
   listeners: [],
   subscribers: {},
   methods: {},
};

export type TInputGroup = {
   title?: string;
   cssGroupe?: string;
   id?: string;
   css?: string;
   type?: string;
   name?: string;
   value?: string | number;
   placeholder?: string;
   required?: boolean;
};
