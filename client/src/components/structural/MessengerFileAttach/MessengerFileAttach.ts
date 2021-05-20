import { Component } from "../../../core/Component";
import { TFileAttachState } from "../../../core/store/stateTypes";
import "./MessengerFileAttach.scss";
import * as acrions from "../../../core/store/actions";

import template from "./MessengerFileAttach.tmpl";
import { ResourcesController } from "../../../controllers/Resource/ResourcesController";
import { ResourcesAPI } from "../../../core/xhr/ResourcesAPI";

export const MessengerFileAttach = {
   name: "MessengerFileAttach",
   template: template,
   components: [],
   props: { file: {} },
   listeners: ["click"],
   subscribers: {},
   storeSubscribers: {
      fileAttachForm: function (state: TFileAttachState) {
         if (state.status === "open") {
            setThumbnailUrl(this);
            openForm(this);
         } else {
            closeForm(this);
         }
      },
   },
   methods: {
      onClick(e: Event & { target: HTMLElement }): void {
         if (e.target.dataset.action === "close") {
            this.$dispatch(acrions.fileAttachCloseForm());
         }
      },
   },
};

function setThumbnailUrl(component: Component) {
   const file = ResourcesController.getAttachedFile();
   const $img = component.$root.find("img").$el;
   if (file) {
      const url = new ResourcesAPI().getResourceURL(file.path);
      $img.setAttribute("src", url);
   } else {
      $img.setAttribute("src", "");
   }
}

function openForm(form: Component) {
   form.$root.addClass("open");
}
function closeForm(form: Component) {
   form.$root.removeClass("open");
}
