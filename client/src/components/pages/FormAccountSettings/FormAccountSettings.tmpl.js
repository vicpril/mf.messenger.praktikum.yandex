import { RightSidebarViews } from "../../../controllers/RightSidebar/RightSidebarViews";

export default /* html */ `
<form class="info__section form__account_settings"
<v-if="action">    
    action="{{action}}"
</v-if>
<v-if="method">    
    method="{{method}}"
</v-if>
>
    <div class="info__content" >
        <h3>Account Settings</h3>

        <v-for :field :index in fields>
        <InputGroup bind:property="form.{{field.id}}" bind:control="form_control.{{field.id}}" bind:options="fields[{{index}}]"></InputGroup>
        </v-for>
    </div>
    
    <div class="info__actions">
    <button type="submit" class="button info__button button_outline_primary" data-action="submit">Update</button>
    <button type="button" class="button info__button button_outline_primary" data-view="${RightSidebarViews.InfoAccount}">Cancel</button>        
    </div>
</form>
`;
