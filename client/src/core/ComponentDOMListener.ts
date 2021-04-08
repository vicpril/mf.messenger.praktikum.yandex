import { capitalize } from "../utils/pure-functions";
import { TDomAbstraction } from "../utils/dom-abstraction";

export class ComponentDOMListenrt {
   name: string = "";
   $root: TDomAbstraction;
   methods: Object;

   constructor(private listeners: string[] = []) {}

   initDOMListeners(): void {
      this.checkRoot();
      this.listeners.forEach((listener) => {
         const method = getMethodName(listener);
         if (!this.methods[method]) {
            throw new Error(
               `Method ${method} is not implemented: ${this.name} Component`
            );
         }
         // to avoid unremoving callbacks, becouse `bind` creates new function
         this.methods[method] = this.methods[method].bind(this);
         this.$root.on(listener, this.methods[method]);
      });
   }

   removeDOMListeners(): void {
      this.checkRoot();
      this.listeners.forEach((listener) => {
         const method = getMethodName(listener);
         this.$root.off(listener, this.methods[method]);
      });
   }

   private checkRoot(): never | void {
      if (!this.$root) {
         throw new Error(
            `Property '$root' is not defined in ${this.name} Component`
         );
      }
   }
}

// click => onClick
function getMethodName(eventName: string) {
   return `on${capitalize(eventName)}`;
}
