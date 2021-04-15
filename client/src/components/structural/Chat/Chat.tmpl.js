export default /* html */ `
<div class="chats__user">
   <div class="user__wrapper {{css}} 
   <v-if="is_selected">
   user__active
   </v-if>"

      >
      <Avatar bind:user="chat.user" bind:css="pulse"></Avatar>
      <div class="user__info">
         <span class="user__displayname">{{chat.user.display_name}}</span>
         <span class="user__last_message">{{last_message_content}}</span>
      </div>
      <div class="user__actions">
         <span class="last_message_date">{{last_message_date}}</span>
         <span 
            class="counter unread_messages_counter <v-if="!counter">is_null</v-if>">
            {{counter}}
         </span>
      </div>

   </div>
</div>;
`;
