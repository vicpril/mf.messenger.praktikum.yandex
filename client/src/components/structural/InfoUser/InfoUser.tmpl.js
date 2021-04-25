export default /* html */ `
<section class="info__section">
   <div class="info__content">
   <h3>Account Info</h3>
   <Avatar bind:user="user" bind:css="avatar__info"></Avatar>
   <h4 class="info__username">{{user.display_name}}</h4>
   </div>
   <div class="info__actions">
   <button type="button" class="button info__button button_outline_primary" data-action="mute-user">Mute notifications</button>
   <button type="button" class="button info__button button_outline_danger" data-action="delete-user">Delete chat</button>
   </div>
</section>
`;
