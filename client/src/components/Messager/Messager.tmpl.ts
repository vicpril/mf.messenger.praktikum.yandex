export default /*html*/ `
<div class="messager">
   <!-- messager__wrapper -->
   <div class="messager__wrapper messager_scrollable scroll_style">
      <v-for :block :index in blocks>
         <Block bind:block="blocks[{{index}}]"></Block>
      </v-for>
   </div>
   <!-- end messager__wrapper -->   
</div>
`;
