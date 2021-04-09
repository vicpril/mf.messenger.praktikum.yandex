export default /*html*/ `
   <img 
      src="{{user.avatar}}"
      class="user__avatar <v-if="css">{{css}}</v-if> "
      alt="{{alt}}"
      style="border-color: {{borderColor}}"
   >
`;
