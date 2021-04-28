import { Component } from "../../core/Component";
import { IIngredients } from "../../core/ComponentInterfaces";
import { TLeftSidebarState } from "../../core/store/stateTypes";
import { Store } from "../../core/store/Store";
import { first } from "../../utils/pure-functions";
import { LeftSidebarViews } from "./LeftSidebarViews";

export class LeftSidebarController {
   private state: TLeftSidebarState = LeftSidebarController.getState();

   constructor(private component: Component) {}

   static getState(): TLeftSidebarState {
      return Store.get().getState().leftSidebar ?? {};
   }

   static getSidebarView() {
      return LeftSidebarController.getState().view ?? LeftSidebarViews.Chats;
   }
}

// function getContentComponent(name: string): IIngredients {
//    return first(this.components.filter((c: IIngredients) => c.name === name));
// }
