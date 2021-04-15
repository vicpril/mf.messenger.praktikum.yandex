export default /* html */ `
<form class="info__section form__avatar_change"
<v-if="action">    
    action="{{action}}"
</v-if>
<v-if="method">    
    method="{{method}}"
</v-if>
>
    <div class="info__content" >
        <h3>Change Avatar</h3>
        <Avatar bind:user="account" bind:css="avatar__info" bind:id="user_info__avatar"></Avatar>
        <div class="upload_wrapper">
        <label>Upload picture</label>
        <InputFileGroup bind:id="avatar_upload" name="avatar"></InputFileGroup>
        </div>
    </div>
    
    <div class="info__actions">
    <button type="submit" class="button info__button button_outline_primary" data-action="submit">Update</button>
    <button type="button" class="button info__button button_outline_primary" data-action="cancel">Cancel</button>
    </div>
</form>
`;
