import { HideLoader, ShowLoader } from "../loader/loader";
import { notifyError } from "../notify/notify";
import { ApiResponse, BaseAPI, ErrorResponse } from "./BaseApi";
import { XHR } from "./XHR";

type ResourceResponse = {
   id: number;
   user_id: number;
   path: string;
   filename: string;
   content_type: string;
   content_size: number;
   upload_date: string; // "2020-01-02T14:22:22.000Z";
};

export class ResourcesAPI extends BaseAPI {
   private host = `${this.basehost}/resourses`;

   private onError = (err: ErrorResponse): ApiResponse => {
      notifyError(err.reason);
      return { status: "failed" };
   };

   getResourceURL(url: string) {
      url = url.startsWith("/") ? url : `/${url}`;
      return `${this.basehost}/resources${url}`;
   }

   upload(data: FormData): Promise<ApiResponse> {
      const options = {
         data,
         withCredentials: true,
         beforeRequest: ShowLoader(),
      };

      return XHR.post(`${this.host}`, options)
         .then(
            (resp: ResourceResponse): ApiResponse => ({
               status: "success",
               data: resp,
            })
         )
         .catch(this.onError)
         .finally(() => {
            HideLoader();
         });
   }
}
