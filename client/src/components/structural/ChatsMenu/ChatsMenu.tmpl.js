import { LeftSidebarViews } from "../../../controllers/LeftSidebar/LeftSidebarViews";

export default /* html */ `
<div class="chats__menu">
   <div class="menu__wrapper">
   <button type="button" class="button button_empty_primary active" data-view="${LeftSidebarViews.Chats}"><i class="fas fa-users"></i></button>
   <button type="button" class="button button_empty_primary" data-view="${LeftSidebarViews.ChatsFilter}"><i class="fas fa-filter"></i></button>
   <button type="button" class="button button_empty_primary" data-view="${LeftSidebarViews.ChatsSearch}"><i class="fas fa-user-plus"></i></button>
   </div>
</div>
`;
