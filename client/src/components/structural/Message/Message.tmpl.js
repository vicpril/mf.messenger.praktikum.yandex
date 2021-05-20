export default /* html */ `
   <div class="message__wrapper">
      <div class="message__content">
      <v-if="m.type === types.message">
         <span class="message_text">{{m.content}}</span>
      </v-if>
      <v-if="m.type === types.file">
         <img class="message_file" src="{{fileurl}}"></img>
      </v-if>
      </div>
      <span class="message__time">{{m.date.getTimeFormatted}}</span>
   </div>
`;
