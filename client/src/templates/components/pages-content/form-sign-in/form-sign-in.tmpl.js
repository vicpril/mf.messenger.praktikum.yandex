export default `
    <form class="info__section form__sign_in"
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
            <h3>Sign In</h3>

            <v-for :field :i in fields>{{field}}</v-for>
        </div>
        
        <div class="info__actions">
            {{button_sign_in}}
            <p>Don't have an account yet?</p>
            {{button_sign_up}}
        </div>
    </form>
`;