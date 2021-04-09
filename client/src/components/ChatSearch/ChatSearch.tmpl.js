export default /*html*/ `
<div class="chats__search">
   <form class="form search__wrapper" 
   <v-if="action">    
      action="{{action}}"
   </v-if>
   <v-if="method">    
      method="{{method}}"
   </v-if>
   >
   <input type="text" class="input input__search_chats" name="search" value="" placeholder="Search"
   </form>
</div>
`;
