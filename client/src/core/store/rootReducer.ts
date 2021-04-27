import { TAccount } from "../../models/types";
import { mergeDeep } from "../../utils/mergeDeep";
import { mergeObjects } from "../../utils/mergeObjects";
import { Actions } from "./actionTypes";
import { TState } from "./stateTypes";
// eslint-disable-next-line import/no-cycle
import { TAction } from "./Store";

export function rootReducer(state: TState, action: TAction): TState {
   let prevState;
   switch (action.type) {
      case Actions.RIGHTSIDEBAR_CHANGE_VIEW:
         prevState = state.rightSidebar || {};
         return {
            ...state,
            rightSidebar: { ...mergeObjects(prevState, action.data) },
         };

      case Actions.ACCOUNT_SETTINGS_UPDATE:
         prevState = state.accountSettings || {};
         return {
            ...state,
            accountSettings: {
               ...mergeDeep(prevState, action.data),
            } as TAccount,
         };

      case Actions.ACCOUNT_PASSWORD_CHANGE:
         prevState = state.accountSettings || {};
         return {
            ...state,
            accountSettings: {
               ...mergeDeep(prevState, action.data),
            } as TAccount,
         };

      case Actions.AUTH_SIGN_IN:
         prevState = state.session || {};
         return {
            ...state,
            session: {
               ...mergeDeep(prevState, { login: action.data }),
            },
         };

      case Actions.AUTH_LOGOUT:
         prevState = state.session || {};
         return {
            ...state,
            session: {},
            rightSidebar: {},
            accountSettings: {} as TAccount,
         };

      default:
         return state;
   }
}
