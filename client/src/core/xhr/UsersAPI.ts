import { AuthController } from "../../controllers/Auth/AuthController";
import {
   HideLeftSidebarLoader,
   ShowLeftSidebarLoader,
} from "../../controllers/LeftSidebar/LeftSidebarLoader/LeftSidebarLoader";
import { HideLoader, ShowLoader } from "../loader/loader";
import { notifyError } from "../notify/notify";
import { BaseAPI, ApiResponse, ErrorResponse } from "./BaseApi";
import { XHR } from "./XHR";

type ChangePasswordData = {
   oldPassword: string;
   newPassword: string;
};

export type UserResponse = {
   id: number;
   first_name: string;
   second_name: string;
   display_name: string;
   login: string;
   email: string;
   phone: string;
   avatar: string;
   role?: "admin" | "regular";
};

export class UsersAPI extends BaseAPI {
   private host = `${this.basehost}/user`;

   private onError = (err: ErrorResponse): ApiResponse => {
      if (err.reason === "Cookie is not valid") {
         AuthController.logout(false);
      }
      notifyError(err.reason);
      return { status: "failed" };
   };

   get(id: number): Promise<ApiResponse> {
      const options = {
         withCredentials: true,
         beforeRequest: ShowLoader(),
      };

      return XHR.get(`${this.host}/${id}`, options)
         .then(
            (resp: UserResponse): ApiResponse => ({
               status: "success",
               data: resp,
            })
         )
         .catch(this.onError)
         .finally(() => {
            HideLoader();
         });
   }

   search(login: string): Promise<ApiResponse> {
      const options = {
         data: {
            login,
         },
         withCredentials: true,
         beforeRequest: ShowLeftSidebarLoader(),
      };

      return XHR.post(`${this.host}/search`, options)
         .then(
            (resp: UserResponse[]): ApiResponse => ({
               status: "success",
               data: resp,
            })
         )
         .catch(this.onError)
         .finally(() => {
            HideLeftSidebarLoader();
         });
   }

   update(data: Omit<UserResponse, "id" | "avatar">): Promise<ApiResponse> {
      const options = {
         data,
         withCredentials: true,
         beforeRequest: ShowLoader(),
      };

      return XHR.put(`${this.host}/profile`, options)
         .then(
            (resp: UserResponse): ApiResponse => ({
               status: "success",
               data: resp,
            })
         )
         .catch(this.onError)
         .finally(() => {
            HideLoader();
         });
   }

   changeAvatar(data: FormData): Promise<ApiResponse> {
      const options = {
         data,
         withCredentials: true,
         beforeRequest: ShowLoader(),
      };

      return XHR.put(`${this.host}/profile/avatar`, options)
         .then(
            (resp: UserResponse): ApiResponse => ({
               status: "success",
               data: resp,
            })
         )
         .catch(this.onError)
         .finally(() => {
            HideLoader();
         });
   }

   changePassword(data: ChangePasswordData): Promise<ApiResponse> {
      const options = {
         data,
         withCredentials: true,
         beforeRequest: ShowLoader(),
      };

      return XHR.put(`${this.host}/password`, options)
         .then((resp): ApiResponse => ({ status: "success", data: resp }))
         .catch(this.onError)
         .finally(() => {
            HideLoader();
         });
   }
}
