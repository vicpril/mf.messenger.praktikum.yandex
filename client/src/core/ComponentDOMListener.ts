import { TDomAbstraction } from "../utils/dom-abstraction";
import { capitalize } from "../utils/pure-functions";

export class ComponentDOMListener {
   name: string = "";
   $root: TDomAbstraction;
   methods?: any;
   id: string;

   constructor(private listeners: string[] = []) {}

   addSingleListener(
      listener: string,
      callback: (e: Event & { target: HTMLElement }) => void
   ) {
      const uniqueName = `${listener}_${this.id}`;
      this.methods[uniqueName] = callback.bind(this);
      this.$root.on(listener, this.methods[uniqueName]);
   }

   initDOMListeners(): void {
      this.checkRoot();
      this.listeners.forEach((listener) => {
         const method = getMethodName(listener);
         if (!this.methods[method]) {
            throw new Error(
               `Method ${method} is not implemented: ${this.name} Component`
            );
         }
         const uniqueName = `${method}_${this.id}`;
         // to avoid unremoving callbacks, becouse `bind` creates new function
         this.methods[uniqueName] = this.methods[method].bind(this);
         const useCapture = ["focus", "blur"].includes(listener);
         this.$root.on(listener, this.methods[uniqueName], useCapture);
      });
   }

   removeDOMListeners(): void {
      this.checkRoot();
      this.listeners.forEach((listener) => {
         const method = getMethodName(listener);
         const uniqueName = `${method}_${this.id}`;
         this.$root.off(listener, this.methods[uniqueName]);
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
function getMethodName(eventName: string): string {
   return `on${capitalize(eventName)}`;
}
