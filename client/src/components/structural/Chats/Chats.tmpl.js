import { LeftSidebarViews } from "../../../controllers/LeftSidebar/LeftSidebarViews";

export default /* html */ `
<div class="chats ">

   <v-if="view !== '${LeftSidebarViews.ChatsSearch}'">
   <!-- ChatsFiltered -->
   <v-for :chatf :indexf in chatsFiltered>
      <!-- User -->
      <Chat bind:chat="chatsFiltered[{{indexf}}]"></Chat>
      <!-- end User -->
      </v-for>
      <!-- end chatsfiltered -->
      <button type="button" class="button button_new button_primary" data-action="newChat">Create a new Chat</button>
   </v-if>

   <v-if="view === '${LeftSidebarViews.ChatsSearch}'">
   
      <v-if="usersRemote.length > 0">
         <!-- UsersRemote -->
         <v-for :user :index in usersRemote>
         <!-- User -->
         <UserRemote bind:user="usersRemote[{{index}}]" bind:chats="chats"></UserRemote>
         <!-- end User -->
         </v-for>
         <!-- end usersremote -->
      <v-else>
         <div class="remote_placeholder__wrapper">
            <h4 class="remote_placeholder">{{remotePlaceholder}}</h4>
         </div>
      </v-if>

   </v-if>
   
</div>
`;
