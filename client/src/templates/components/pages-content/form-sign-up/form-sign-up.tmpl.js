export default `
    <form class="info__section form__sign_up"
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
            <h3>Sign Up</h3>

            <v-for :field :i in fields>{{field}}</v-for>
        </div>
        
        <div class="info__actions">
            {{button_sign_up}}
            <a href="/signin.html">Back to Sign in</a>
        </div>
    </form>
`;