import {
   HideLeftSidebarLoader,
   ShowLeftSidebarLoader,
} from "../../controllers/LeftSidebar/LeftSidebarLoader/LeftSidebarLoader";
import { HideLoader, ShowLoader } from "../loader/loader";
import { notifyError } from "../notify/notify";
import { ApiResponse, BaseAPI, ErrorResponse } from "./BaseApi";
import { UserResponse } from "./UsersAPI";
import { XHR } from "./XHR";

export type ChatResponse = {
   id: number;
   title: string;
   avatar: string;
   unread_count: number;
   last_message: {
      user: UserResponse;
      time: string;
      content: string;
   };
};

type ChatsRequest = {
   offset?: number;
   limit?: number;
   title?: string;
};

type ChatsUsersRequest = {
   id: number;
   offset?: number;
   limit?: number;
   name?: string;
   email?: string;
};

type ChatsUploadAvatarRequest = {
   chatId: number;
   avatar?: File | FormData;
};

type ChatsAddUsersRequest = {
   users: number[];
   chatId: number;
};

type ChatsDeleteUsersRequest = ChatsAddUsersRequest;

type ChatDeleteResponse = {
   userId: number;
   result: {
      id: number;
      title: string;
      avatar: string;
   };
};

export class ChatsAPI extends BaseAPI {
   private host = `${this.basehost}/chats`;

   getChats(params?: ChatsRequest): Promise<ApiResponse> {
      const options = {
         ...{ params },
         ...{
            withCredentials: true,
            beforeRequest: ShowLeftSidebarLoader(),
         },
      };

      return XHR.get(`${this.host}`, options)
         .then(
            (resp: ChatResponse[]): ApiResponse => ({
               status: "success",
               data: resp,
            })
         )
         .catch(
            (err: ErrorResponse): ApiResponse => {
               notifyError(err.reason);
               return { status: "failed" };
            }
         )
         .finally(() => {
            HideLeftSidebarLoader();
         });
   }

   createChat(title: string): Promise<ApiResponse> {
      const options = {
         data: {
            title,
         },
         withCredentials: true,
         beforeRequest: ShowLoader(),
      };

      return XHR.post(`${this.host}`, options)
         .then(
            ({ id }): ApiResponse => ({
               status: "success",
               data: id,
            })
         )
         .catch(
            (err: ErrorResponse): ApiResponse => {
               notifyError(err.reason);
               return { status: "failed" };
            }
         )
         .finally(() => {
            HideLoader();
         });
   }

   deleteChat(chatId: number): Promise<ApiResponse> {
      const options = {
         data: {
            chatId,
         },
         withCredentials: true,
         beforeRequest: ShowLoader(),
      };

      return XHR.delete(`${this.host}`, options)
         .then(
            (resp: ChatDeleteResponse): ApiResponse => ({
               status: "success",
               data: resp,
            })
         )
         .catch(
            (err: ErrorResponse): ApiResponse => {
               notifyError(err.reason);
               return { status: "failed" };
            }
         )
         .finally(() => {
            HideLoader();
         });
   }

   getChatsUsers(params: ChatsUsersRequest): Promise<ApiResponse> {
      const options = {
         ...{ params },
         ...{
            withCredentials: true,
            beforeRequest: ShowLoader(),
         },
      };

      return XHR.get(`${this.host}/${params.id}/users`, options)
         .then(
            (resp: UserResponse[]): ApiResponse => ({
               status: "success",
               data: resp,
            })
         )
         .catch(
            (err: ErrorResponse): ApiResponse => {
               notifyError(err.reason);
               return { status: "failed" };
            }
         )
         .finally(() => {
            HideLoader();
         });
   }

   getNewMessages(chatId: number): Promise<ApiResponse> {
      const options = {
         withCredentials: true,
         beforeRequest: ShowLoader(),
      };

      return XHR.get(`${this.host}/new/${chatId}`, options)
         .then(
            ({ unread_count }): ApiResponse => ({
               status: "success",
               data: { unread_count },
            })
         )
         .catch(
            (err: ErrorResponse): ApiResponse => {
               notifyError(err.reason);
               return { status: "failed" };
            }
         )
         .finally(() => {
            HideLoader();
         });
   }

   uploadAvatar(data: FormData): Promise<ApiResponse> {
      console.log("~ data", data);
      const options = {
         data,
         withCredentials: true,
         beforeRequest: ShowLoader(),
      };

      return XHR.put(`${this.host}/avatar`, options)
         .then(
            (resp: ChatResponse): ApiResponse => ({
               status: "success",
               data: resp,
            })
         )
         .catch(
            (err: ErrorResponse): ApiResponse => {
               notifyError(err.reason);
               return { status: "failed" };
            }
         )
         .finally(() => {
            HideLoader();
         });
   }

   addUsers(params: ChatsAddUsersRequest): Promise<ApiResponse> {
      const options = {
         ...{ params },
         ...{
            withCredentials: true,
            beforeRequest: ShowLoader(),
         },
      };

      return XHR.put(`${this.host}/users`, options)
         .then(
            (): ApiResponse => ({
               status: "success",
            })
         )
         .catch(
            (err: ErrorResponse): ApiResponse => {
               notifyError(err.reason);
               return { status: "failed" };
            }
         )
         .finally(() => {
            HideLoader();
         });
   }

   deleteUsers(params: ChatsDeleteUsersRequest): Promise<ApiResponse> {
      const options = {
         ...{ params },
         ...{
            withCredentials: true,
            beforeRequest: ShowLoader(),
         },
      };

      return XHR.delete(`${this.host}/users`, options)
         .then(
            (): ApiResponse => ({
               status: "success",
            })
         )
         .catch(
            (err: ErrorResponse): ApiResponse => {
               notifyError(err.reason);
               return { status: "failed" };
            }
         )
         .finally(() => {
            HideLoader();
         });
   }
}
