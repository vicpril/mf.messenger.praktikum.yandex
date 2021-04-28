export default /* html */ `
<div class="chats__user">
   <div class="user_remote__wrapper {{css}}">
      <Avatar bind:user="user"></Avatar>
      <div class="user__info">
         <span class="user__displayname">{{user.login}}</span>
         <span class="user__last_message">{{user.first_name}} {{user.second_name}}</span>
      </div>
      <div class="user_remote__actions">
         <button type="button" class="button button_empty_primary button__add_user" data-action="add"><i class="fas fa-plus"></i></button>
         <span class="user_added"><i class="fas fa-check"></i></span>
      </div>

   </div>
</div>;
`;
