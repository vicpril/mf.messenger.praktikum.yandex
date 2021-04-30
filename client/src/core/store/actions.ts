import { TChat } from "../../models/Chat";
import { Actions } from "./actionTypes";
import { TAction } from "./Store";

export function rightSidebar(data: any): TAction {
   return {
      type: Actions.RIGHTSIDEBAR_CHANGE_VIEW,
      data,
   };
}
export function leftSidebar(data: any): TAction {
   return {
      type: Actions.LEFTSIDEBAR_CHANGE_VIEW,
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
      type: Actions.ACCOUNT_PASSWORD_CHANGE,
      data,
   };
}

export function setSession(data: any = null): TAction {
   return data
      ? {
           type: Actions.AUTH_SIGN_IN,
           data: data?.login,
        }
      : {
           type: Actions.AUTH_LOGOUT,
        };
}

export function selectChat(id: number | null): TAction {
   return {
      type: Actions.CHATS_SELECT_CHAT,
      data: {
         selectedChatId: id,
      },
   };
}

export function uploadChats(chats: TChat[]): TAction {
   return {
      type: Actions.CHATS_UPLOAD_CHATS,
      data: chats,
   };
}
