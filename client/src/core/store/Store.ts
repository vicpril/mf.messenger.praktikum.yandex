import { cloneDeep } from "../../utils/cloneDeep";
import { isEmpty } from "../../utils/isEmpty";
// eslint-disable-next-line import/no-cycle
import { rootReducer } from "./rootReducer";
import { TState } from "./stateTypes";

export type StoreSubscriberMethod = (state: TState) => void;
export type StoreSubscriberMethods = {
   [K in keyof TState]: StoreSubscriberMethod;
};
export interface StoreSubscription {
   unsubscribe: () => void;
}
export type TStore = InstanceType<typeof Store>;
export type TAction = { type: string; data?: any };
export type TReducer = (state: TState, action: TAction) => TState;

export class Store {
   static _instance = {} as Store;

   private state: TState = {};
   public prevState: TState = {};
   private subscribers: StoreSubscriberMethod[] = [];

   constructor(private rootReducer: TReducer, private initialState: TState) {
      this.state = rootReducer({ ...this.initialState }, { type: "__INIT__" });
   }

   subscribe<F extends StoreSubscriberMethod>(fn: F): StoreSubscription {
      this.subscribers.push(fn);
      return {
         unsubscribe: function () {
            this.subscribers = this.subscribers.filter(
               (subscriber: StoreSubscriberMethod) => subscriber !== fn
            );
         }.bind(this),
      };
   }

   dispatch(action: TAction) {
      this.prevState = cloneDeep(this.state);
      this.state = this.rootReducer(this.state, action);
      this.subscribers.forEach((subscriber: StoreSubscriberMethod) =>
         subscriber(this.state)
      );
   }

   getState() {
      return this.state;
   }

   // alias for createStore(rootReducer)
   static get(): Store {
      return createStore(rootReducer);
   }
}

export function createStore(rootReducer: TReducer, initialState: TState = {}) {
   if (!Store._instance || isEmpty(Store._instance)) {
      Store._instance = new Store(rootReducer, initialState);
   }
   return Store._instance;
}
