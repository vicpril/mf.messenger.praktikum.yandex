export default `<button
    <v-if="id">
        id="{{id}}"
    </v-if>
    <v-if="css">
        class="{{css}}"
    </v-if>
    <v-if="type">
        type="{{type}}"
    <v-else>
        type="submit"
    </v-if>
    <v-if="callback">
        onclick="{{callback}}"
    </v-if>
>{{title}}</button>`;