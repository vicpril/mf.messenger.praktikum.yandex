import { Component } from "../../core/Component";
import { isEmpty } from "../../utils/isEmpty";
import { isSuccess } from "../../utils/pure-functions";
import * as actions from "../../core/store/actions";
import { TAccount } from "../../models/types";
import { TAccountState, TChatsState } from "../../core/store/stateTypes";
import { AuthAPI } from "../../core/xhr/AuthAPI";
import { User } from "../../models/User";
import { Store } from "../../core/store/Store";
import { verify } from "../../core/validator/form";
import { UserResponse, UsersAPI } from "../../core/xhr/UsersAPI";
import { Actions } from "../../core/store/actionTypes";
import { NoticeStatus, notify } from "../../core/notify/notify";
import { ChatResponse, ChatsAPI } from "../../core/xhr/ChatsAPI";
import { Chat } from "../../models/Chat";
import {
   HideChatInfoLoader,
   ShowChatInfoLoader,
} from "../../components/structural/InfoChat/InfoChatLoader";
import {
   HideLeftSidebarLoader,
   ShowLeftSidebarLoader,
} from "../LeftSidebar/LeftSidebarLoader/LeftSidebarLoader";

export class ChatsController {
   constructor(private component: Component) {}

   static getState(): TChatsState {
      return Store.get().getState().chats ?? {};
   }

   async createChat(formData: FormData) {
      if (verify(this.component)()) {
         try {
            const title = formData.get("title")?.toString() ?? "";

            const { status, data: chatId } = await new ChatsAPI().createChat(
               title
            );
            if (isSuccess(status)) {
               this.component.$emit("HideNewChatModal");
               this.component.$emit("Chat:updated");
               notify(
                  "New Chat was created successfuly",
                  NoticeStatus.SUCCESS,
                  3000
               );
            }
         } catch (error) {
            console.warn(error);
         }
      }
   }

   async getChats() {
      try {
         const options = {
            beforeRequest: ShowLeftSidebarLoader(),
            afterRequest: HideLeftSidebarLoader,
         };
         const { status, data } = await new ChatsAPI(options).getChats();
         if (isSuccess(status)) {
            const chats = data.map((chat: ChatResponse) => new Chat(chat));
            return chats;
         }
      } catch (error) {
         console.warn(error);
         return null;
      }
   }

   async uploadAvatar(chatId: number, formData: FormData) {
      try {
         formData.append("chatId", chatId.toString());
         const { status, data } = await new ChatsAPI().uploadAvatar(formData);
         if (isSuccess(status)) {
            this.component.$dispatch(actions.rightSidebar({ chat: data }));
            notify(
               "Your avatar was updated successfuly",
               NoticeStatus.SUCCESS,
               3000
            );
            this.component.$emit("Chat:updated", data.id);
         }
      } catch (error) {
         console.warn(error);
      }
   }

   async delete(chatId: number) {
      try {
         const { status } = await new ChatsAPI().deleteChat(chatId);
         if (isSuccess(status)) {
            notify(
               "The chat was deleted successfuly",
               NoticeStatus.SUCCESS,
               3000
            );
            this.component.$emit("Chat:updated");
            this.component.$emit("closeRightSidebar");
            this.component.$dispatch(actions.rightSidebar({ chat: {} }));
         }
      } catch (error) {
         console.warn(error);
      }
   }

   async getChatUsers(chatId: number) {
      try {
         const params = {
            id: chatId,
            limit: 10,
         };
         const options = {
            beforeRequest: ShowChatInfoLoader,
            afterRequest: HideChatInfoLoader,
         };
         const { status, data: usersdata } = await new ChatsAPI(
            options
         ).getChatUsers(params);
         if (isSuccess(status)) {
            return usersdata.map((data: UserResponse) => new User(data));
         }
      } catch (error) {
         console.warn(error);
      }
   }

   // async changePassword(formData: FormData) {
   //    if (verify(this.component)()) {
   //       try {
   //          const userdata = {
   //             oldPassword: formData.get("old_password")?.toString() ?? "",
   //             newPassword: formData.get("new_password")?.toString() ?? "",
   //          };

   //          const { status } = await new UsersAPI().changePassword(userdata);
   //          if (isSuccess(status)) {
   //             this.component.$dispatch({
   //                type: Actions.ACCOUNT_PASSWORD_CHANGE,
   //             });
   //             notify(
   //                "Your password was updated successfuly",
   //                NoticeStatus.SUCCESS,
   //                3000
   //             );
   //          }
   //       } catch (error) {
   //          console.warn(error);
   //       }
   //    }
   // }

   // static getAccount(): TAccount | {} {
   //    const account = ChatsController.getState();
   //    return !isEmpty(account) ? account : ChatsController.fetch();
   // }

   // static async fetch() {
   //    try {
   //       const { data } = await new AuthAPI().account();
   //       if (data) {
   //          const user = new User(data);
   //          Store.get().dispatch(actions.accountSettingsUpdate(user));
   //          Store.get().dispatch(actions.setSession({ login: user.login }));
   //       } else {
   //          // AuthController.logout();
   //          Store.get().dispatch(actions.setSession());
   //       }
   //    } catch (error) {
   //       console.warn(error);
   //       Store.get().dispatch(actions.setSession());
   //    }
   // }
}
