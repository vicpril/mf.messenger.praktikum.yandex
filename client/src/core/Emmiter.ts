export type Subscription = {
   unsubscribe: () => void;
};

export type TEmmiter = InstanceType<typeof Emmiter>;

class Emmiter {
   static _instance = null;

   private listeners: {} = {};

   subscribe(event: string, fn): Subscription {
      this.listeners[event] = this.listeners[event] || [];
      this.listeners[event].push(fn);
      return {
         unsubscribe() {
            return function () {
               this.listeners[event] = this.listeners[event].filter(
                  (listener) => listener !== fn
               );
            }.bind(getEmmiter());
         },
      };
   }

   emit(event: string, ...params: any): boolean {
      if (!Array.isArray(this.listeners[event])) {
         return false;
      }
      this.listeners[event].forEach((listener) => {
         listener(...params);
      });
      return true;
   }
}

export function getEmmiter(): Emmiter {
   if (!Emmiter._instance) {
      Emmiter._instance = new Emmiter();
   }
   return Emmiter._instance;
}
