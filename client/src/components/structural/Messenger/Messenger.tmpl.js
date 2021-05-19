export default /* html */ `
<div class="messenger">
   <!-- messenger__wrapper -->
   <div class="messenger__wrapper messenger_scrollable scroll_style ">
      <v-for :block :index in blocks>
         <Block bind:block="blocks[{{index}}]"></Block>
      </v-for>
      <div class="buffer file_attach_form_opened"></div>
   </div>
   <!-- end messenger__wrapper -->   
</div>
`;
