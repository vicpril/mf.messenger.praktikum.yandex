export default /* html */ `
<div class="input_group <v-if="control.touched && !control.valid">invalid</v-if>">
    <label for="{{options.id}}">{{options.title}}</label>
    <input 
    <v-if="options.id">
        id="{{options.id}}"
    </v-if>
        class="input {{options.css}}"
    <v-if="options.type">
        type="{{options.type}}"
    <v-else>
        type="text"
    </v-if>
    <v-if="options.name">
        name="{{options.name}}"
    </v-if>
        
        value="{{property.value}}"
    <v-if="options.placeholder">
        placeholder="{{options.placeholder}}"
    </v-if>
    <v-if="options.required">
        required
    </v-if>
   />

   <v-for :error :key in control.errors>
      <v-if="control.errors.{{key}}.isError">
         <small>{{error.message}}</small>
      </v-if>
   </v-for>
</div>
`;
