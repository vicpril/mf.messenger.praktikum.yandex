export default /* html */ `
   <img 
      <v-if="id">id='{{id}}'</v-if>
      src="{{user.avatar}}"
      class="user__avatar <v-if="css">{{css}}</v-if> "
      alt="{{alt}}"
      style="border-color: {{borderColor}}"
   >
`;
