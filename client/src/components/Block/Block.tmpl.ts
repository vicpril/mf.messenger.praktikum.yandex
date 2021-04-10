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
               <div class="message__wrapper">
                  <div class="message__content">
                        <span class="message_text">{{message.content}}</span>
                  </div>
                  <span class="message__time">{{message.time.getTimeFormatted}}</span>
               </div>
            </v-for>
      </div>
   </div>
   </section>
   
</v-if>

`;
