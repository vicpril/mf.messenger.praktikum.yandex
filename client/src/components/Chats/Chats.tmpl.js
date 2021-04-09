export default /*html*/ `
<div class="chats ">
   <v-for :chat :index in chatsFiltered>
   <!-- User -->
   <Chat bind:chat="chatsFiltered[{{index}}]"></Chat>
   <!-- end User -->
   </v-for>
</div>
`;
