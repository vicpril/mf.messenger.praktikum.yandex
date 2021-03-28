import { ErrorPage } from "/templates/components/pages-content/error-page/error-page";

export class ErrorPage404 extends ErrorPage {
    constructor() {
        super();
        this.context = {
            code: "404",
            title: "Oops! No conversation here",
            content: "The page you're looking for beyond our reach."
        }
    }

    render() {
        return super.render()
    }

}
