import { Component } from "../../core/Component";
import { TMessengerState } from "../../core/store/stateTypes";
import { Store } from "../../core/store/Store";

export class MessengerController {
   constructor(private component: Component) {}

   static getState(): TMessengerState {
      return Store.get().getState().messenger ?? {};
   }
}
