import { Indexed } from "../utils/mergeDeep";
import { isEqual } from "../utils/pure-functions";
import { ComponentDOMListener } from "./ComponentDOMListener";
import { IIngredients } from "./ComponentInterfaces";
import { rootReducer } from "./store/rootReducer";
import { TState } from "./store/stateTypes";
import {
   createStore,
   StoreSubscriberMethods,
   StoreSubscription,
   TAction,
   TStore,
} from "./store/Store";

export class ComponentStoreSubscriber extends ComponentDOMListener {
   private store: TStore = createStore(rootReducer);
   protected storeSubscribers: StoreSubscriberMethods;
   private prevState: TState;
   private storeSubscriptions: StoreSubscription[] = [];

   constructor(options: IIngredients) {
      super(options.listeners);
      this.storeSubscribers = options.storeSubscribers ?? {};
   }

   protected initStoreSubscribers() {
      this.prevState = this.store.getState();

      const subscription = this.store.subscribe((state: TState) => {
         Object.keys(state).forEach((key: keyof TState) => {
            // if (
            //    !isEqual(this.prevState[key] as Indexed, state[key] as Indexed)
            // ) {
            if (this.isWatching(key)) {
               const changes = state[key];
               this.storeSubscribers[key]?.call(this, changes);
            }
            // }
         });
      });

      this.storeSubscriptions.push(subscription);
   }

   private isWatching(key: keyof TState): boolean {
      return !!this.storeSubscribers[key];
   }

   protected unsubscribeStoreSubscriptioins() {
      this.storeSubscriptions.forEach((sub) => sub.unsubscribe());
      this.storeSubscriptions = [];
   }

   $dispatch(action: TAction) {
      this.store?.dispatch(action);
   }
}
