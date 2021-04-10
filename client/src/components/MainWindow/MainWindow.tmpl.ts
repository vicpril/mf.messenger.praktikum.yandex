export default /*html*/ `
<main class="main right_sidebar__close1">

   <v-if="is_selected">

         <!-- messager -->
         <Messager bind:chat="chat"></Messager>
         <!-- end messager -->

         <!-- messager form -->
         <MessagerMenu bind:chat="chat"></MessagerMenu>
         <!-- end form -->

   <v-else>
         <div class="chat_placeholder">
         <h3>
         Select a friend to type with...
         </h3>
         </div>
   </v-if>

   <!-- Right-sidebar -->
   <RightSidebar></RightSidebar>
   <!-- end Right-sidebar -->
</main>
`;
