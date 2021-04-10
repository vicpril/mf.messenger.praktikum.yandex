import template from "./DefaultPage.tmpl";
import "./DefaultPage.scss";

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
   beforeCreate() {
      this.template = switchContentTag(this.components[0].name, this.template);
   },
};

function switchContentTag(newTagName: string, template: string): string {
   return template.replace(/Content/gis, newTagName);
}
