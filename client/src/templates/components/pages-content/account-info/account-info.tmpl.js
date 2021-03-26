export default `
    <div class="info__content">
        <h3>Account Info</h3>
        {{avatar}}
        <h4 class="info__username">{{user.first_name}} {{user.last_name}}</h4>
        <span class="info__displayname">{{user.display_name}}</span>
    </div>
    <div class="info__actions">
        {{button_change_avatar}}
        {{button_change_settings}}
        {{button_change_password}}
    </div>
`;