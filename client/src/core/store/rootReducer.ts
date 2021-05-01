import { TUser } from "../../models/User";
import { mergeDeep } from "../../utils/mergeDeep";
import { mergeObjects } from "../../utils/mergeObjects";
import { Actions } from "./actionTypes";
import { TAccountState, TState } from "./stateTypes";
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

      case Actions.CHATS_UPLOAD_CHATS:
         prevStateLocal = state.chats || {};
         return {
            ...state,
            chats: {
               ...prevStateLocal,
               availableChats: action.data,
            },
         };
      case Actions.SELECTED_CHAT_CHANGE:
         prevStateLocal = state.selectedChatId || {};
         return {
            ...state,
            selectedChatId: action.data,
         };

      case Actions.ACCOUNT_SETTINGS_UPDATE:
         prevStateLocal = state.accountSettings || {};
         return {
            ...state,
            accountSettings: {
               ...mergeDeep(prevStateLocal, action.data),
            } as TUser,
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
            accountSettings: {} as TUser,
         };

      case Actions.TOKENS_SAVE:
         prevStateLocal = state.tokens || {};
         return {
            ...state,
            tokens: {
               ...mergeDeep(prevStateLocal, {
                  [action.data.chatId]: action.data.token,
               }),
            },
         };

      case Actions.MESSENGER_SAVE:
         prevStateLocal = state.messenger || {};
         return {
            ...state,
            messenger: {
               ...mergeDeep(prevStateLocal, {
                  [action.data.chatId]: action.data.messages,
               }),
            },
         };

      case Actions.USERS_SAVE:
         prevStateLocal = state.users || {};
         return {
            ...state,
            users: {
               ...prevStateLocal,
               ...action.data,
            },
         };

      default:
         return state;
   }
}
