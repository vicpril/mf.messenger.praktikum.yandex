import { TChat } from "../../models/Chat";
import { TMessage } from "../../models/Message";
import { TUser } from "../../models/User";
import { Actions } from "./actionTypes";
import { TUserState } from "./stateTypes";
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
      type: Actions.SELECTED_CHAT_CHANGE,
      data: id,
   };
}

export function uploadChats(chats: TChat[]): TAction {
   return {
      type: Actions.CHATS_UPLOAD_CHATS,
      data: chats,
   };
}

export function saveToken(chatId: number, token: string): TAction {
   return {
      type: Actions.TOKENS_SAVE,
      data: {
         chatId,
         token,
      },
   };
}

export function saveMessenger(chatId: number, messages: TMessage[]): TAction {
   return {
      type: Actions.MESSENGER_SAVE,
      data: {
         chatId,
         messages,
      },
   };
}

export function updateChetMessages(
   chatId: number,
   messages: TMessage[]
): TAction {
   return {
      type: Actions.MESSENGER_UPDATE_CHAT,
      data: {
         chatId,
         messages,
      },
   };
}

export function saveUsers(users: TUser[]): TAction {
   const data = users.reduce((acc: TUserState, curr) => {
      acc[curr.id] = curr;
      return acc;
   }, {});
   return {
      type: Actions.USERS_SAVE,
      data,
   };
}

export function logout(): TAction {
   return {
      type: Actions.AUTH_LOGOUT,
   };
}
