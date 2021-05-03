import { TLeftSidebarState } from "../../core/store/stateTypes";
import { Store } from "../../core/store/Store";
import { LeftSidebarViews } from "./LeftSidebarViews";

export class LeftSidebarController {
   static getState(): TLeftSidebarState {
      return Store.get().getState().leftSidebar ?? {};
   }

   static getSidebarView() {
      return LeftSidebarController.getState().view ?? LeftSidebarViews.Chats;
   }
}
