import {
   HideLeftSidebarLoader,
   ShowLeftSidebarLoader,
} from "../../controllers/LeftSidebar/LeftSidebarLoader/LeftSidebarLoader";
import { UserFields } from "../../models/User";
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
};

export class UsersAPI extends BaseAPI {
   private host = `${this.basehost}/user`;

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

   update(data: Omit<UserFields, "id" | "avatar">): Promise<ApiResponse> {
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

   changePassword(data: ChangePasswordData): Promise<ApiResponse> {
      const options = {
         data,
         withCredentials: true,
         beforeRequest: ShowLoader(),
      };

      return XHR.put(`${this.host}/password`, options)
         .then((resp): ApiResponse => ({ status: "success", data: resp }))
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
