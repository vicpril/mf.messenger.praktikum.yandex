export default /* html */ `
<div class="info__wrapper scroll_style">
   <div class="right_sidebar__actions">
      <button type="button" class="button button__close button_primary">&times;</button>
      <div class="theme_mod__wrapper">
         <label>Theme <span id="theme_mode">{{theme}}</span> </label>
         <div class="toggler">
            <input type="checkbox" id="themeToggler" /><label for="themeToggler">Toggle</label>
         </div>
      </div>
   </div>
   <section class="right_sidebar__content"></section>
</div>
`;
