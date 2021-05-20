export default /* html */ `
<v-if="block.type === 'date'">
   <section class="block block__date">
      <span class="date__title">{{block.content}}</span>
   </section>
<v-else>
   <section class="block block__message 
   <v-if="block.content.isforeign">
      block_foreign
   <v-else>
      block_own
   </v-if>
   ">
   <div class="block__username">
      <span class="user__displayname">{{block.content.user.display_name}}</span>
   </div>

   <div class="block__user_messages">
      <Avatar bind:user="block.content.user"></Avatar>
      <div class="block__messages">
            <v-for :message :index in block.content.messages>
               <Message bind:message="block.content.messages[{{index}}]"></Message>
            </v-for>
      </div>
   </div>
   </section>
   
</v-if>

`;
