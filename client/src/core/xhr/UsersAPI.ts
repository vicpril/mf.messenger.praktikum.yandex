import { UserFields } from "../../models/User";
import { HideLoader, ShowLoader } from "../loader/loader";
import { notifyError } from "../notify/notify";
import { BaseAPI } from "./BaseApi";
import { XHR } from "./XHR";

type ApiResponse = {
   status: "success" | "failed";
   data?: any;
};

type ChangePasswordData = {
   oldPassword: string;
   newPassword: string;
};

export class UsersAPI extends BaseAPI {
   private host = `${this.basehost}/user`;

   get(id: number): Promise<ApiResponse> {
      const options = {
         withCredentials: true,
         beforeRequest: ShowLoader(),
      };

      return XHR.get(`${this.host}/${id}`, options)
         .then((resp): ApiResponse => ({ status: "success", data: resp }))
         .catch(
            (err): ApiResponse => {
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
      };

      return XHR.post(`${this.host}/search`, options)
         .then((resp): ApiResponse => ({ status: "success", data: resp }))
         .catch(
            (err): ApiResponse => {
               notifyError(err.reason);
               return { status: "failed" };
            }
         )
         .finally(() => {});
   }

   update(data: Omit<UserFields, "id" | "avatar">): Promise<ApiResponse> {
      const options = {
         data,
         withCredentials: true,
         beforeRequest: ShowLoader(),
      };

      return XHR.put(`${this.host}/profile`, options)
         .then((resp): ApiResponse => ({ status: "success", data: resp }))
         .catch(
            (err): ApiResponse => {
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
         .then((resp): ApiResponse => ({ status: "success", data: resp }))
         .catch(
            (err): ApiResponse => {
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
            (err): ApiResponse => {
               notifyError(err.reason);
               return { status: "failed" };
            }
         )
         .finally(() => {
            HideLoader();
         });
   }
}
