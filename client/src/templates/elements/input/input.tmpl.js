export default `<input 
    <v-if="id">
        id="{{id}}"
    </v-if>
    <v-if="css">
        class="{{css}}"
    </v-if>
    <v-if="type">
        type="{{type}}"
    <v-else>
        type="text"
    </v-if>
    <v-if="name">
        name="{{name}}"
    </v-if>
        value="{{value}}"
    <v-if="placeholder">
        placeholder="{{placeholder}}"
    </v-if>
    
/>
`;