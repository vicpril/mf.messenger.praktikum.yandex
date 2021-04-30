export default /* html */ `
<div class="chats__user">
   <div class="user__wrapper {{css}} 
   <v-if="is_selected">
   user__active
   </v-if>"

      >
      <Avatar bind:user="user"></Avatar>
      <div class="user__info">
         <span class="user__displayname">{{user.display_name}}</span>
         <span class="user__last_message">{{user.login}}
         <v-if="user.role"> ({{user.role}})</v-if>
         </span>
      </div>
      <div class="user__actions">
      </div>
   </div>
</div>;
`;
