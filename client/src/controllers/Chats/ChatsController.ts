import { Component } from "../../core/Component";
import { isSuccess } from "../../utils/pure-functions";
import * as actions from "../../core/store/actions";
import { User } from "../../models/User";
import { Store } from "../../core/store/Store";
import { verify } from "../../core/validator/form";
import { UserResponse } from "../../core/xhr/UsersAPI";
import { NoticeStatus, notify } from "../../core/notify/notify";
import { ChatResponse, ChatsAPI } from "../../core/xhr/ChatsAPI";
import { Chat, TChat } from "../../models/Chat";
import {
   HideChatInfoLoader,
   ShowChatInfoLoader,
} from "../../components/structural/InfoChat/InfoChatLoader";
import {
   HideLeftSidebarLoader,
   ShowLeftSidebarLoader,
} from "../LeftSidebar/LeftSidebarLoader/LeftSidebarLoader";
import { TChatsState } from "../../core/store/stateTypes";
import { htmlspecialchars } from "../../utils/htmlspecialchars";

export class ChatsController {
   constructor(private component: Component) {}

   static getState(): TChatsState {
      return Store.get().getState().chats ?? {};
   }

   static getAvailableChats(): TChat[] {
      return (
         ChatsController.getState().availableChats?.map(
            (c: TChat) => new Chat(c)
         ) || []
      );
   }

   static getSelectedChatId(): number {
      return Store.get().getState().selectedChatId ?? 0;
   }

   static getSelectedChat(): TChat | null {
      const chatId = ChatsController.getSelectedChatId();
      const chat = ChatsController.getState().availableChats?.filter(
         (chat: TChat) => chat.id === chatId
      )[0] as ChatResponse;

      return chat ? new Chat(chat) : null;
   }

   async createChat(formData: FormData) {
      if (verify(this.component)()) {
         try {
            const title = formData.get("title")?.toString() ?? "";

            const cleardata = htmlspecialchars(title);

            const { status } = await new ChatsAPI().createChat(cleardata);
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

   async getChats(silent: boolean = false) {
      try {
         const options = silent
            ? {
                 beforeRequest: () => {},
                 afterRequest: HideLeftSidebarLoader,
              }
            : {
                 beforeRequest: ShowLeftSidebarLoader(),
                 afterRequest: HideLeftSidebarLoader,
              };
         const { status, data } = await new ChatsAPI(options).getChats();
         if (isSuccess(status)) {
            const chats = data.map((chat: ChatResponse) => new Chat(chat));
            this.component.$dispatch(actions.uploadChats(chats));
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
            this.component.$dispatch(actions.selectChat(null));
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
         };
         const options = {
            beforeRequest: ShowChatInfoLoader,
            afterRequest: HideChatInfoLoader,
         };
         const { status, data: usersdata } = await new ChatsAPI(
            options
         ).getChatUsers(params);
         if (isSuccess(status)) {
            const users = usersdata.map((data: UserResponse) => new User(data));
            Store.get().dispatch(actions.saveUsers(users));
            return users;
         }
      } catch (error) {
         console.warn(error);
      }
   }

   async addUser(userId: number, chatId: number) {
      try {
         const params = {
            users: [userId],
            chatId,
         };
         const options = {
            beforeRequest: ShowChatInfoLoader,
            afterRequest: HideChatInfoLoader,
         };
         const { status } = await new ChatsAPI(options).addUsers(params);
         if (isSuccess(status)) {
            if (this.component.name.startsWith("UserRemote")) {
               this.component.props.css = "added";
               this.component.$emit(this.component.EVENTS.UPDATE);
            }
            this.component.$emit("Chat:userAdded");
            notify("User was added to chat");
         }
      } catch (error) {
         console.warn(error);
      }
   }

   async deleteUser(userId: number, chatId: number) {
      try {
         const params = {
            users: [userId],
            chatId,
         };
         const options = {
            beforeRequest: ShowChatInfoLoader,
            afterRequest: HideChatInfoLoader,
         };
         const { status } = await new ChatsAPI(options).deleteUsers(params);
         if (isSuccess(status)) {
            this.component.$emit("Chat:userDeleted");
            notify("User was removed from chat");
         }
      } catch (error) {
         console.warn(error);
      }
   }

   static async getToken(chatId: number) {
      try {
         const { status, data } = await new ChatsAPI().requestToken(chatId);
         if (isSuccess(status)) {
            const { token } = data;
            return token;
         }
      } catch (error) {
         console.warn(error);
      }
   }

   static async getNewMessagesCount(chatId: number) {
      if (!chatId || chatId === 0) {
         return -1;
      }
      try {
         const options = {
            beforeRequest: () => {},
            afterRequest: () => {},
         };
         const { status, data } = await new ChatsAPI(
            options
         ).getNewMessagesCount(chatId);
         if (isSuccess(status)) {
            return data.unread_count;
         }
      } catch (error) {
         console.warn(error);
      }
   }
}
