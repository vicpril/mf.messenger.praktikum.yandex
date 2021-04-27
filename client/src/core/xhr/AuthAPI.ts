import { HideLoader } from "../loader/loader";
import { notifyError } from "../notify/notify";
import { BaseAPI } from "./BaseApi";
import { XHR, XHROptions, METHOD } from "./XHR";

type LoginData = {
   login: string;
   password: string;
};

type ApiResponse = {
   status: "success" | "failed";
   data?: any;
};

export type LoginOptions = XHROptions & {
   data: LoginData;
};

export class AuthAPI extends BaseAPI {
   private host = `${this.basehost}/auth`;

   login(options: LoginOptions): Promise<ApiResponse> {
      options = {
         ...options,
         ...{
            withCredentials: true,
         },
      };

      return XHR.post(`${this.host}/signin`, options)
         .then((): ApiResponse => ({ status: "success" }))
         .catch(
            (err): ApiResponse => {
               if (err.reason === "User already in system") {
                  return { status: "success" };
               }
               notifyError(err.reason);
               return { status: "failed" };
            }
         )
         .finally(() => {
            HideLoader();
         });
   }

   logout() {
      const options = {
         withCredentials: true,
      };

      return XHR.post(`${this.host}/logout`, options)
         .then(() => ({ status: "success" }))
         .catch((err) => {
            notifyError(err.reason);
            return { status: "failed" };
         })
         .finally(() => {
            HideLoader();
         });
   }

   register() {}
}
