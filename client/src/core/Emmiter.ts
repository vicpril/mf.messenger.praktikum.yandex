import { isEmpty } from "../utils/isEmpty";

export interface ISubscription {
   unsubscribe: TSubscriberMethod;
}
export type TEmmiter = InstanceType<typeof Emmiter>;

interface IListeners {
   [key: string]: TSubscriberMethod[];
}

export type TSubscriberMethod = (...args: any) => void;
export interface ISubscriberMethods {
   [key: string]: TSubscriberMethod;
}

class Emmiter {
   static _instance = {} as Emmiter;

   private listeners: IListeners = {};

   subscribe<T extends string, K extends TSubscriberMethod>(
      event: T,
      fn: K
   ): ISubscription {
      this.listeners[event] = this.listeners[event] || [];
      this.listeners[event].push(fn);
      return {
         unsubscribe() {
            return function () {
               this.listeners[event] = this.listeners[event].filter(
                  (listener: TSubscriberMethod) => listener !== fn
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

   contains(event: string): boolean {
      return typeof this.listeners[event] !== "undefined";
   }
}

export function getEmmiter(): Emmiter {
   if (!Emmiter._instance || isEmpty(Emmiter._instance)) {
      Emmiter._instance = new Emmiter();
   }
   return Emmiter._instance;
}
