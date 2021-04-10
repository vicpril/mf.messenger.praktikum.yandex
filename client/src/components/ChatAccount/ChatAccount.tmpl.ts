export default /*html*/ `
    <div class="account__wrapper">
      <div class="user__wrapper account__user">
         <Avatar bind:user="account"></Avatar>
         <div class="user__info">
            <span class="user__displayname">{{account.display_name}}</span>
         </div>
         <div class="user__actions">
            <button type="button" class="button button__user_settings button_empty_primary">
               <i class="fas fa-ellipsis-v"></i>
            </button>
         </div>
      </div>
    </div>
`;
