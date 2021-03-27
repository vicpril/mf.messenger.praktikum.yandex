export default `
    <form class="info__section form__avatar_change"
    <v-if="action">    
        action="{{action}}"
    </v-if>
    <v-if="method">    
        method="{{method}}"
    </v-if>
    <v-if="onsubmit">    
        onsubmit="{{prevent_action}}{{onsubmit}}"
    </v-if>
    >
        <div class="info__content" >
            <h3>Change Avatar</h3>
            {{avatar}}
            <div class="upload_wrapper">
            <label>Upload picture</label>
            {{input_file}}            
            </div>
        </div>
        
        <div class="info__actions">
            {{button_update}}
            {{button_cancel}}
        </div>
    </form>
`;