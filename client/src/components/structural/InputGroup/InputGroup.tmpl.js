export default /* html */ `
<div class="input_group {{obj.cssGroup}}">
    <label for="{{obj.id}}">{{obj.title}}</label>
    <input 
    <v-if="obj.id">
        id="{{obj.id}}"
    </v-if>
        class="input {{obj.css}}"
    <v-if="obj.type">
        type="{{obj.type}}"
    <v-else>
        type="text"
    </v-if>
    <v-if="obj.name">
        name="{{obj.name}}"
    </v-if>
        value="{{obj.value}}"
    <v-if="obj.placeholder">
        placeholder="{{obj.placeholder}}"
    </v-if>
    <v-if="obj.required">
        required
    </v-if>
   />
</div>
`;
