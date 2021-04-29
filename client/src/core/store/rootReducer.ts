import { TAccount } from "../../models/types";
import { mergeDeep } from "../../utils/mergeDeep";
import { mergeObjects } from "../../utils/mergeObjects";
import { Actions } from "./actionTypes";
import { TState } from "./stateTypes";
// eslint-disable-next-line import/no-cycle
import { TAction } from "./Store";

export function rootReducer(state: TState, action: TAction): TState {
   let prevStateLocal;
   switch (action.type) {
      case Actions.RIGHTSIDEBAR_CHANGE_VIEW:
         prevStateLocal = state.rightSidebar || {};
         return {
            ...state,
            rightSidebar: { ...mergeObjects(prevStateLocal, action.data) },
         };

      case Actions.LEFTSIDEBAR_CHANGE_VIEW:
         prevStateLocal = state.leftSidebar || {};
         return {
            ...state,
            leftSidebar: { ...mergeObjects(prevStateLocal, action.data) },
         };

      case Actions.CHATS_SELECT_CHAT:
         prevStateLocal = state.chats || {};
         return {
            ...state,
            chats: { ...mergeObjects(prevStateLocal, action.data) },
         };

      case Actions.CHATS_UPDATE_CHAT:
         prevStateLocal = state.chats || {};
         return {
            ...state,
            chats: { ...mergeObjects(prevStateLocal, action.data) },
         };

      case Actions.ACCOUNT_SETTINGS_UPDATE:
         prevStateLocal = state.accountSettings || {};
         return {
            ...state,
            accountSettings: {
               ...mergeDeep(prevStateLocal, action.data),
            } as TAccount,
         };

      case Actions.ACCOUNT_PASSWORD_CHANGE:
         prevStateLocal = state.accountSettings || {};
         return { ...state };

      case Actions.AUTH_SIGN_IN:
         prevStateLocal = state.session || {};
         return {
            ...state,
            session: {
               ...mergeDeep(prevStateLocal, { login: action.data }),
            },
         };

      case Actions.AUTH_LOGOUT:
         prevStateLocal = state.session || {};
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
