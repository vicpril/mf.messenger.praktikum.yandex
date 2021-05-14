import { AuthController } from "../../controllers/Auth/AuthController";
import { HideLoader, ShowLoader } from "../loader/loader";
import { notifyError } from "../notify/notify";
import { ApiResponse, BaseAPI, ErrorResponse } from "./BaseApi";
import { UserResponse } from "./UsersAPI";
import { XHR, XHROptions } from "./XHR";

export type ChatResponse = {
   id: number;
   title: string;
   avatar: string;
   unread_count: number;
   last_message:
      | string
      | null
      | {
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

type ChatsAddUsersRequest = {
   users: number[];
   chatId: number;
};

type ChatsTokenRequest = {
   token: string;
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
   private xhrOptions: XHROptions = {};
   private defaultXHROptions = {
      withCredentials: true,
      beforeRequest: ShowLoader(),
      afterRequest: HideLoader,
   };

   constructor(xhrOptions: XHROptions = {}) {
      super();
      this.xhrOptions = {
         ...this.defaultXHROptions,
         ...xhrOptions,
      };
   }

   private onFinally = () => {
      if (this.xhrOptions.afterRequest) {
         this.xhrOptions.afterRequest();
      } else {
         this.defaultXHROptions.afterRequest();
      }
   };

   private onError = (err: ErrorResponse): ApiResponse => {
      if (err.reason === "Cookie is not valid") {
         AuthController.logout(false);
      }
      notifyError(err.reason);
      return { status: "failed" };
   };

   getChats(data?: ChatsRequest): Promise<ApiResponse> {
      const options = {
         ...this.xhrOptions,
         data,
      } as XHROptions;

      return XHR.get(`${this.host}`, options)
         .then(
            (resp: ChatResponse[]): ApiResponse => ({
               status: "success",
               data: resp,
            })
         )
         .catch(this.onError)
         .finally(this.onFinally);
   }

   createChat(title: string): Promise<ApiResponse> {
      const options = {
         ...this.xhrOptions,
         data: {
            title,
         },
      } as XHROptions;

      return XHR.post(`${this.host}`, options)
         .then(
            ({ id }): ApiResponse => ({
               status: "success",
               data: id,
            })
         )
         .catch(this.onError)
         .finally(this.onFinally);
   }

   deleteChat(chatId: number): Promise<ApiResponse> {
      const options = {
         ...this.xhrOptions,
         data: {
            chatId,
         },
      } as XHROptions;

      return XHR.delete(`${this.host}`, options)
         .then(
            (resp: ChatDeleteResponse): ApiResponse => ({
               status: "success",
               data: resp,
            })
         )
         .catch(this.onError)
         .finally(this.onFinally);
   }

   getChatUsers(data: ChatsUsersRequest): Promise<ApiResponse> {
      const options = {
         ...this.xhrOptions,
         data,
      } as XHROptions;

      return XHR.get(`${this.host}/${data.id}/users`, options)
         .then(
            (resp: UserResponse[]): ApiResponse => ({
               status: "success",
               data: resp,
            })
         )
         .catch(this.onError)
         .finally(this.onFinally);
   }

   getNewMessagesCount(chatId: number): Promise<ApiResponse> {
      const options = {
         ...this.xhrOptions,
      } as XHROptions;

      return XHR.get(`${this.host}/new/${chatId}`, options)
         .then(
            ({ unread_count }): ApiResponse => ({
               status: "success",
               data: { unread_count },
            })
         )
         .catch(this.onError)
         .finally(this.onFinally);
   }

   uploadAvatar(data: FormData): Promise<ApiResponse> {
      const options = {
         ...this.xhrOptions,
         data,
      } as XHROptions;

      return XHR.put(`${this.host}/avatar`, options)
         .then(
            (resp: ChatResponse): ApiResponse => ({
               status: "success",
               data: resp,
            })
         )
         .catch(this.onError)
         .finally(this.onFinally);
   }

   addUsers(data: ChatsAddUsersRequest): Promise<ApiResponse> {
      const options = {
         ...this.xhrOptions,
         data,
      } as XHROptions;

      return XHR.put(`${this.host}/users`, options)
         .then(
            (): ApiResponse => ({
               status: "success",
            })
         )
         .catch(this.onError)
         .finally(this.onFinally);
   }

   deleteUsers(data: ChatsDeleteUsersRequest): Promise<ApiResponse> {
      const options = {
         ...this.xhrOptions,
         data,
      } as XHROptions;

      return XHR.delete(`${this.host}/users`, options)
         .then(
            (): ApiResponse => ({
               status: "success",
            })
         )
         .catch(this.onError)
         .finally(this.onFinally);
   }

   requestToken(chatId: number): Promise<ApiResponse> {
      const options = {
         withCredentials: true,
      };
      return XHR.post(`${this.host}/token/${chatId}`, options)
         .then(
            (resp: ChatsTokenRequest): ApiResponse => ({
               status: "success",
               data: resp,
            })
         )
         .catch(this.onError);
   }
}
