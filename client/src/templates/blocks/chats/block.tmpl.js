export const blockTemplate = function () {
    return `
        <!-- Можно {{}} с пробелами, можно без-->
        <div class="{{ className }}">
            <span onClick="{{ handleClick }}">{{text}}</span>
            <span>{{ user.info.firstName }}</span>
        </div>
        `;
};
