import { IIngredients, IMethods } from "../../core/ComponentInterfaces";
import { mergeDeep } from "../../utils/mergeDeep";
import { arrayUnique } from "../../utils/pure-functions";
import { RightSidebarViews } from "./RightSidebarViews";
import * as actions from "../../core/store/actions";

/**
 * For moving in sidebar just define data-view="${RightSidebarViews....}"
 */
export function RightSidebarDecorator(original: IIngredients): IIngredients {
   original.listeners = arrayUnique([
      ...(original.listeners || []),
      ...["click"],
   ]);

   const onClick = function (e: Event & { target: HTMLElement }) {
      if (e.target.dataset.view) {
         goToView.call(this, e.target.dataset.view);
      }
   };

   if (original.methods && original.methods.onClick) {
      const originalMethod = original.methods.onClick;
      mergeDeep(original.methods || {}, {
         onClick: function (e: Event & { target: HTMLElement }) {
            originalMethod.call(this, e);
            onClick.call(this, e);
         },
      }) as IMethods;
   } else {
      original.methods = mergeDeep(original.methods || {}, {
         onClick,
      }) as IMethods;
   }

   return original;
}

function goToView(view: string): void {
   if (view in RightSidebarViews) {
      const actionData = { componentName: view };
      this.$dispatch(actions.rightSidebar(actionData));
   }
}
