import { RightSidebarViews } from "../../../controllers/RightSidebar/RightSidebarViews";

export default /* html */ `
<section class="info__section">
   <div class="info__content">
      <h3>Chat Info</h3>
      <h4 class="info__title">{{chat.title}}</h4>
      <Avatar bind:user="chat" bind:css="avatar__info"></Avatar>
   </div>
   {{loader}}
   <div class="chat__users">
   
   </div>
   <div class="info__actions">
   <button type="button" class="button info__button button_outline_primary" data-view="${RightSidebarViews.FormChangeChatAvatar}">Change avatar</button>
   <button type="button" class="button info__button button_outline_danger" data-action="delete">Delete chat</button>
   </div>
</section>
`;
