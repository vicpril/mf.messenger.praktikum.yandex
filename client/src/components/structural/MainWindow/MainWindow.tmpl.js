export default /* html */ `
<main class="main right_sidebar__close">

   <v-if="is_selected">

         <!-- messanger -->
         <Messanger></Messanger>
         <!-- end messanger -->

         <!-- messanger form -->
         <MessangerMenu></MessangerMenu>
         <!-- end form -->

   <v-else>
         <div class="chat_placeholder">
         <h3>
         Select a chat to type with...
         </h3>
         </div>
   </v-if>

   <!-- Right-sidebar -->
   <RightSidebar bind:page="page"></RightSidebar>
   <!-- end Right-sidebar -->
</main>
`;
