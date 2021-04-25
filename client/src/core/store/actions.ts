import { Actions } from "./actionTypes";
import { TAction } from "./Store";

export function rightSidebar(data: any): TAction {
   return {
      type: Actions.RIGHTSIDEBAR_CHANGE_VIEW,
      data,
   };
}

export function accountSettingsUpdate(data: any): TAction {
   return {
      type: Actions.ACCOUNT_SETTINGS_UPDATE,
      data,
   };
}

export function accountPasswordChange(data: any): TAction {
   return {
      type: Actions.ACCOUNT_SETTINGS_UPDATE,
      data,
   };
}
