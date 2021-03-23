import { LeftSidebar } from "/templates/components/leftSidebar/left-sidebar";
import { MainContainer } from "/templates/components/main/main";
import account from "/models/modelAccount.json";
import chats from "/models/modelChats.json";

export class App {
    constructor(selector) {
        this.$el = document.querySelector(selector);
    }

    init() {
        // debugger
        this.render();
    }

    render() {
        this.$el.innerHtml = '';

        const account = this._getAccount();
        const chats = this._getChats();
        const current_user = this.__getCurrentUser();

        const leftSidebar = new LeftSidebar(account, chats, current_user);

        const data = this._getData(current_user);
        const main = new MainContainer(data);

        // const user = {};
        // const rightSidebar = new RightSidebar(user);

        this.$el.innerHtml = '';
        this.$el.insertAdjacentHTML('beforeend', leftSidebar.render());
        this.$el.insertAdjacentHTML('beforeend', main.render());
        // this.$el.insertAdjacentHTML('beforeend', rightSidebar.render());

    }

    _getChats() {
        return chats;
    }

    _getAccount() {
        return account;
    }

    _getData(current_user = null) {
        return current_user
            ? this._getChats()
                .filter(user => user.login === current_user)
                .data
            : {}
            ;
    }

    __getCurrentUser() {
        return this._getChats()[1].login;
    }
}