export default /* html */ `
<main class="main right_sidebar__close <v-if="!is_selected">chat_not_selected</v-if> ">

         <!-- messenger -->
         <Messenger></Messenger>
         <!-- end messenger -->

         <!-- messenger form -->
         <MessengerMenu></MessengerMenu>
         <!-- end form -->

         <div class="chat_placeholder">
         <h3>
         Select a chat to type with...
         </h3>
         </div>

   <!-- Right-sidebar -->
   <RightSidebar bind:page="page"></RightSidebar>
   <!-- end Right-sidebar -->
</main>
`;
