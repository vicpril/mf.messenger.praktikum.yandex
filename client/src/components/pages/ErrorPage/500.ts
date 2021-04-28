import { Router } from "../../../core/router/Router";
import "./ErrorPage.scss";

const template = `
<div id="app" class="fluid-container">
   <div class="main__default">
      <div class="main__wrapper">
         <h1>Oops! Houston, we have a problem.</h1>
         <p>Server error. Please contact on administrator</p>
         <a href="#" data-action="back">&larr; Let's go back</a>
      </div>
      <div class="default__right_sidebar">
         <div class="info__content">
            <span class="error_page__title">500</span>
         </div>
      </div>
   </div>
</div>
`;

export const ErrorPage500 = {
   name: "ErrorPage500",
   template: template,
   listeners: ["click"],
   methods: {
      onClick(e: Event & { target: HTMLElement }) {
         if (e.target.dataset.action === "back") {
            e.preventDefault();
            Router.back();
         }
      },
   },
};
