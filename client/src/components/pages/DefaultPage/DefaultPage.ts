import template from "./DefaultPage.tmpl";
import "./DefaultPage.scss";
import { ErrorPage404 } from "../ErrorPage/404";

export const DefaultPage = {
   name: "DefaultPage",
   template: template,
   components: [],
   props: {
      page: "signin",
      title: "Welcome to Easy conversation chats",
      content: "You will find a companion for any topic here",
   },
   listeners: [],
   subscribers: {},
   methods: {},
   beforePrepare() {
      switch (this.props.page) {
         case "404":
            this.components = [ErrorPage404];
            this.template = switchContentTag("ErrorPage404", this.template);
            break;
         case "500":
            // this.components = [ErrorPage500];
            this.template = switchContentTag("ErrorPage500", this.template);
            break;
         case "signup":
            // this.components = [SignUpPage];
            this.template = switchContentTag("SignUpPage", this.template);
            break;
         default:
         case "signin":
            // this.components = [SignInPage];
            this.template = switchContentTag("SignInPage", this.template);
            break;
      }
   },
};

function switchContentTag(newTagName: string, template: string): string {
   return template.replace(/Content/gis, newTagName);
}
