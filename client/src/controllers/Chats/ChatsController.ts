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
import { UsersAPI } from "../../core/xhr/UsersAPI";
import { Actions } from "../../core/store/actionTypes";
import { NoticeStatus, notify } from "../../core/notify/notify";
import { ChatResponse, ChatsAPI } from "../../core/xhr/ChatsAPI";
import { Chat } from "../../models/Chat";

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

               // this.component.$dispatch({
               //    type: Actions.ACCOUNT_SETTINGS_UPDATE,
               //    data: data,
               // });
               // this.component.$dispatch(
               //    actions.setSession({ login: data.login })
               // );
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
         const { status, data } = await new ChatsAPI().getChats();
         if (isSuccess(status)) {
            // console.log("~ data", data);
            const chats = data.map((chat: ChatResponse) => new Chat(chat));
            // this.component.$dispatch({
            //    type: Actions.ACCOUNT_SETTINGS_UPDATE,
            //    data: data,
            // });
            // this.component.$dispatch(actions.setSession({ login: data.login }));
            // notify("Chats was fetched successfuly", NoticeStatus.SUCCESS, 3000);
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
