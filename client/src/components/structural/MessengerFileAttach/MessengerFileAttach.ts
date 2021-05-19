import "./MessengerFileAttach.scss";

import template from "./MessengerFileAttach.tmpl";

export const MessengerFileAttach = {
   name: "MessengerFileAttach",
   template: template,
   components: [],
   props: {},
   listeners: ["click"],
   subscribers: {},
   methods: {
      onClick(e: Event & { target: Element }): void {},
   },
};
