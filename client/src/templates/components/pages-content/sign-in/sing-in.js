import { DefaultPage } from "/templates/components/structural/default-page/default-page";
import { FormSignIn } from "/templates/components/pages-content/form-sign-in/form-sign-in";

export class SignInPage extends DefaultPage {
    constructor() {
        super({});
    }

    render() {
        this.context.sidebar_content = this._getSidebarContent();
        return super.render();
    }

    _getSidebarContent() {
        return (new FormSignIn()).render();
    }

}