import { Component } from "../../core/Component";
import { first, isSuccess } from "../../utils/pure-functions";
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
            return usersdata.map((data: UserResponse) => new User(data));
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
         }
      } catch (error) {
         console.warn(error);
      }
   }

   static getAvailableChats(): TChat[] {
      return (
         ChatsController.getState().availableChats?.map(
            (c: ChatResponse) => new Chat(c)
         ) || []
      );
   }

   static getSelectedChatId(): number {
      return ChatsController.getState().selectedChatId ?? 0;
   }

   static getSelectedChat(): TChat | null {
      const chatId = ChatsController.getSelectedChatId();
      const chat = ChatsController.getState().availableChats?.filter(
         (chat: ChatResponse) => chat.id === chatId
      )[0] as ChatResponse;

      return chat ? new Chat(chat) : null;
   }
}
