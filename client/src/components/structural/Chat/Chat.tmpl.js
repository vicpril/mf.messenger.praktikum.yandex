export default /* html */ `
<div class="chats__user">
   <div class="chat__wrapper {{css}} 
   <v-if="is_selected">
   chat__active
   </v-if>"

      >
      <Avatar bind:user="chat" bind:css="pulse"></Avatar>
      <div class="chat__info">
         <span class="chat__displayname">{{chat.id}} - {{chat.title}}</span>
         <span class="chat__last_message">{{last_message_content}}</span>
      </div>
      <div class="chat__actions">
         <span class="last_message_date">{{last_message_date}}</span>
         <span 
            class="counter unread_messages_counter is_null">
            
         </span>
      </div>

   </div>
</div>;
`;
