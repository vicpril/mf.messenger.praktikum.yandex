import { DefaultPage } from "/templates/components/structural/default-page/default-page";
import { FormSignUp } from "/templates/components/pages-content/form-sign-up/form-sign-up";

export class SignUpPage extends DefaultPage {
    constructor() {
        super({});
    }

    render() {
        this.context.sidebar_content = this._getSidebarContent();
        return super.render();
    }

    _getSidebarContent() {
        return (new FormSignUp()).render();
    }

}