import { UserFields } from "../../models/User";
import { HideLoader, ShowLoader } from "../loader/loader";
import { notifyError } from "../notify/notify";
import { BaseAPI } from "./BaseApi";
import { XHR, XHROptions } from "./XHR";

type ApiResponse = {
   status: "success" | "failed";
   data?: any;
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
      };

      return XHR.put(`${this.host}/profile`, options)
         .then((resp): ApiResponse => ({ status: "success", data: resp }))
         .catch(
            (err): ApiResponse => {
               notifyError(err.reason);
               return { status: "failed" };
            }
         )
         .finally(() => {});
   }

   updateAvatar() {}

   changePassword() {}
}
