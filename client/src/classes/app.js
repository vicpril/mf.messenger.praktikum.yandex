import { LeftSidebar } from "/templates/components/leftSidebar/left-sidebar";
import { MainContainer } from "/templates/components/main-container/main-container";
import account from "/models/modelAccount.json";
import chats from "/models/modelChats.json";
import { getUrlParameter } from "/utils/mydash/getUrl";

export class App {
    constructor(selector) {
        this.$el = document.querySelector(selector);
    }

    init() {
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

    /**
     * Return an object with account and current chat
     * 
     * @param {String} current_user
     * @returns {Object}
     */
    _getData(current_user = null) {
        const chat = current_user
            ? this._getChats()
                .filter(chat => chat.login === current_user)[0]
            : null
            ;
        const account = this._getAccount();
        return Object.assign({}, { chat }, { account }, { current_user });
    }

    __getCurrentUser() {
        const userlogin = getUrlParameter('user');
        if (!userlogin) {
            return null;
        }
        const user = this._getChats().filter(u => u.login === userlogin).first();
        return user ? user.login : null;

    }

}

