export default /* html */ `
   <div class="avatar__wrapper">
   <img 
   <v-if="id">id='{{id}}'</v-if>
   src="{{avatar}}"
   class="user__avatar <v-if="css">{{css}}</v-if> "
   alt="{{alt}}"
   style="border-color: {{borderColor}}"
   >
   </div>
`;
