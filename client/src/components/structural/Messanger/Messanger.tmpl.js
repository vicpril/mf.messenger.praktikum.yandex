export default /* html */ `
<div class="messanger">
   <!-- messanger__wrapper -->
   <div class="messanger__wrapper messanger_scrollable scroll_style">
      <v-for :block :index in blocks>
         <Block bind:block="blocks[{{index}}]"></Block>
      </v-for>
   </div>
   <!-- end messanger__wrapper -->   
</div>
`;
