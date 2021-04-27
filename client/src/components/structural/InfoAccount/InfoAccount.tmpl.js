import { RightSidebarViews } from "../../../controllers/RightSidebar/RightSidebarViews";

export default /* html */ `
<section class="info__section">
   <div class="info__content">
   <h3>Account Info</h3>
   <Avatar bind:user="user" bind:css="avatar__info"></Avatar>
   <h4 class="info__username">{{user.first_name}} {{user.last_name}}</h4>
   <span class="info__displayname">{{user.display_name}}</span>
   </div>
   <div class="info__actions">
   <button type="button" class="button info__button button_outline_primary" data-view="${RightSidebarViews.FormChangeAvatar}">Change Avatar</button>
   <button type="button" class="button info__button button_outline_primary" data-view="${RightSidebarViews.FormAccountSettings}">Account Settings</button>
   <button type="button" class="button info__button button_outline_primary" data-view="${RightSidebarViews.FormPasswordChange}">Change Password</button>
   <button type="button" class="button info__button button_outline_danger" data-action="logout">Log Out <i class="fas fa-sign-out-alt"></i></button>
   </div>
</section>
`;
