export default /* html */ `
<div class="messenger__menu">
   <MessengerFileAttach></MessengerFileAttach>
   <form class="form messenger__form" 
   <v-if="action">    
      action="{{action}}"
   </v-if>
   <v-if="method">    
      method="{{method}}"
   </v-if>
   >
      <div class="input__wrapper">
         <label for="attachment">
            <span type="button" class="button button__attach button_empty_primary"><i class="fas fa-paperclip fa-2x"></i></span>
         </label>
         <input id="attachment" type="file" class="hidden" name="attachment" value=""/>
         <input type="text" class="input input__message" name="message" value="" placeholder="Type a new message ..."/>
         <button type="submit" class="button button__submit button_primary">Send</button>
      </div>
   </form>
</div>
`;
