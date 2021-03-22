import { LeftSidebar } from "../templates/components/leftSidebar/left-sidebar";
import account from "./../models/modelAccount.json";
import chats from "./../models/modelChats.json";

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
        const leftSidebar = new LeftSidebar(account, chats);

        // const data = {};
        // const main = new Main(data);

        // const user = {};
        // const rightSidebar = new RightSidebar(user);

        this.$el.innerHtml = '';
        this.$el.insertAdjacentHTML('beforeend', leftSidebar.render());
        // this.$el.insertAdjacentHTML('beforeend', main.render());
        // this.$el.insertAdjacentHTML('beforeend', rightSidebar.render());

    }

    _getChats() {
        return chats;
    }

    _getAccount() {
        return account;
    }
}