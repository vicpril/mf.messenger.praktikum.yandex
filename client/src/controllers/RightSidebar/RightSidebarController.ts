import { Component } from "../../core/Component";
import { IIngredients } from "../../core/ComponentInterfaces";
import { TRightSidebarState } from "../../core/store/stateTypes";
import { Store } from "../../core/store/Store";
import { TUser } from "../../models/types";
import { AppService } from "../../services/AppService";
import { $, TDomAbstraction } from "../../utils/dom-abstraction";
import { first, get } from "../../utils/pure-functions";

export class RightSidebarController {
   private state: TRightSidebarState = RightSidebarController.getState();

   constructor(private component: Component) {}

   static getState(): TRightSidebarState {
      return Store.get().getState().rightSidebar ?? {};
   }

   changeContent(): void {
      if (this.state.componentName) {
         const newComponentName = this.state.componentName;
         const currentComponent = first(
            this.component.componentsInst
         ) as Component;

         this.component.$emit(currentComponent.EVENTS.DESTROY);
         currentComponent.$remove();

         const $targetElContent = $.create(newComponentName);
         this.component.$root.find("section").append($targetElContent);

         const newComponent = new Component(
            getContentComponent.call(this.component, newComponentName),
            $targetElContent,
            this.component
         );
         this.component.componentsInst = [];
         this.component.componentsInst.push(newComponent);
      }
   }

   addContent(): void {
      const contentComponentName = get(this.state, "componentName", "InfoUser");
      const $targetElContent = this.component.$root.find(
         "section"
      ) as TDomAbstraction;
      const $content = $.create(contentComponentName);
      $targetElContent.append($content);
   }

   static getUser(): TUser | null {
      const login = RightSidebarController.getState().login || null;
      return login
         ? AppService.getChatInfo(login)?.user || null
         : AppService.getAccount();
   }

   static getSidebarStatus() {
      return RightSidebarController.getState().status ?? "close";
   }
}

function getContentComponent(name: string): IIngredients {
   return first(this.components.filter((c: IIngredients) => c.name === name));
}
