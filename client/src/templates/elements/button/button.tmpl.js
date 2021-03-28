export default `<button
    <v-if="id">
        id="{{id}}"
    </v-if>
        class="button {{css}}"
    <v-if="type">
        type="{{type}}"
    <v-else>
        type="submit"
    </v-if>
    <v-if="onclick">
        onclick="{{prevent_action}}{{onclick}}"
    </v-if>
>{{title}}</button>`;