import "./ErrorPage.scss";

const template = `
<div id="app" class="fluid-container">
   <div class="main__default">
      <div class="main__wrapper">
         <h1>Oops! No conversation here</h1>
         <p>The page you're looking for beyond our reach.</p>
         <a href="#">&larr; Let's go back</a>
      </div>
      <div class="default__right_sidebar">
         <div class="info__content">
            <span class="error_page__title">404</span>
         </div>
      </div>
   </div>
</div>
`;

export const ErrorPage404 = {
   name: "ErrorPage404",
   template: template,
};
