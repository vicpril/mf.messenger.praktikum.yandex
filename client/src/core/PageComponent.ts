import { Component } from "./Component";

export class PageComponent extends Component {
   // constructor(options: IIngredients) {
   //    super($.create("div"), options);
   // }

   getRoot() {
      return this.$root;
   }

   afterRender() {
      this.$emit(this.EVENTS.BEFORE_INIT);
   }

   destroy() {
      this.$emit(this.EVENTS.DESTROY);
   }

   /* Have to override parent method */
   protected _beforeCreate(): void {
      this.beforeCreate();

      // CREATE: create $root
      this.initRoot();
      this.bindModels();

      // RENDER all children components
      this.beforeInitChildren();
      this.initChildren();
   }
}
