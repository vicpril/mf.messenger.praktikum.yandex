import { HideLoader, ShowLoader } from "../loader/loader";
import { notifyError } from "../notify/notify";
import { ApiResponse, BaseAPI } from "./BaseApi";
import { XHR, XHROptions } from "./XHR";

type LoginData = {
   login: string;
   password: string;
};

type RegisterData = {
   first_name: string;
   second_name: string;
   login: string;
   email: string;
   password: string;
   phone: string;
};

export type LoginOptions = XHROptions & {
   data: LoginData;
};

export type RegisterOptions = XHROptions & {
   data: RegisterData;
};
export class AuthAPI extends BaseAPI {
   private host = `${this.basehost}/auth`;

   login(options: LoginOptions): Promise<ApiResponse> {
      options = {
         ...options,
         ...{
            withCredentials: true,
         },
         beforeRequest: ShowLoader(),
      };

      return XHR.post(`${this.host}/signin`, options)
         .then(
            (): ApiResponse => ({
               status: "success",
            })
         )
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

   logout(): Promise<ApiResponse> {
      const options = {
         withCredentials: true,
      };

      return XHR.post(`${this.host}/logout`, options)
         .then((): ApiResponse => ({ status: "success" }))
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

   register(options: RegisterOptions): Promise<ApiResponse> {
      options = {
         ...options,
         ...{
            withCredentials: true,
         },
      };

      return XHR.post(`${this.host}/signup`, options)
         .then((): ApiResponse => ({ status: "success" }))
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

   account(): Promise<ApiResponse> {
      const options = {
         withCredentials: true,
         beforeRequest: ShowLoader(),
      };

      return XHR.get(`${this.host}/user`, options)
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
