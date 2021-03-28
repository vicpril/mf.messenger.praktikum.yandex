export default `
    <div class="info__content">
        <h3>Contact Info</h3>
        {{avatar}}
        <h4 class="info__username">{{user.display_name}}</h4>
    </div>
    <div class="info__actions">
        {{button_mute_notification}}
        {{button_delete_chat}}
    </div>
`;