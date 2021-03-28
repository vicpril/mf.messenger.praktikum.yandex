import { LeftSidebar } from "/templates/components/structural/left-sidebar/left-sidebar";
import { MainContainer } from "/templates/components/structural/main-container/main-container";
import account from "/models/modelAccount.json";
import chats from "/models/modelChats.json";
import { getUrlParameter } from "/utils/mydash/getUrl";
import { ErrorPage } from "/templates/components/pages-content/error-page/error-page";
import { ErrorPage500 } from "../templates/components/pages-content/error-page-500/error-page-500";
import { ErrorPage404 } from "../templates/components/pages-content/error-page-404/error-page-404";
import { SignInPage } from "../templates/components/pages-content/sign-in/sing-in";
import { SignUpPage } from "../templates/components/pages-content/sign-up/sing-up";

export class App {
    constructor(selector) {
        this.$el = document.querySelector(selector);
        this.page = null;
    }

    init(page) {
        this.page = page;
        this.render();
    }

    render() {
        // this.$el.innerHtml = '';

        const account = this._getAccount();
        const chats = this._getChats();
        const current_user = this._getCurrentUser();

        const leftSidebar = new LeftSidebar(account, chats, current_user);

        const data = this._getData(current_user);
        const main = new MainContainer(data);

        const pageElements = [];

        /**
         * 
         * Switch pages for printing html
         * 
         *      This needs only for Sprint 1
         */
        switch (this.page) {

            case "404":
                pageElements.push(new ErrorPage404());
                break;
            case "500":
                pageElements.push(new ErrorPage500());
                break;
            case "signin":
                pageElements.push(new SignInPage());
                break;
            case "signup":
                pageElements.push(new SignUpPage());
                break;

            case "chat":
            default:
                pageElements.push(leftSidebar);
                pageElements.push(main);
                break;

                break;
        }

        this._render(pageElements)

        // this.$el.innerHtml = '';
        // this.$el.insertAdjacentHTML('beforeend', leftSidebar.render());
        // this.$el.insertAdjacentHTML('beforeend', main.render());

        // const page = new ErrorPage404();

        // const page = new ErrorPage500();

        // const page = new SignInPage();
        // const page = new SignUpPage();

        // this.$el.insertAdjacentHTML('beforeend', page.render());

    }

    _render(elements) {
        this.$el.innerHtml = '';
        for (const element of elements) {
            this.$el.insertAdjacentHTML('beforeend', element.render());
        }
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

    _getCurrentUser() {
        const userlogin = getUrlParameter('user');
        if (!userlogin) {
            return null;
        }
        const user = this._getChats().filter(u => u.login === userlogin).first();
        return user ? user.login : null;
    }

}

