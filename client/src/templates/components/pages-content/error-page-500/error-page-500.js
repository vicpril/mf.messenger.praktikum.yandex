import { ErrorPage } from "/templates/components/pages-content/error-page/error-page";

export class ErrorPage500 extends ErrorPage {
    constructor() {
        super();
        this.context = {
            code: "500",
            title: "Oops! Houston, we have a problem",
            content: "Server error. Please contact an administrator."
        }
    }

    render() {
        return super.render()
    }

}
