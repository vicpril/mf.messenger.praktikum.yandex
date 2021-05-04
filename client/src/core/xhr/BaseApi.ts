export type ApiResponse = {
   status: "success" | "failed";
   data?: any;
};

export type ErrorResponse = {
   reason: string;
};

export class BaseAPI {
   protected basehost: string = "https://ya-praktikum.tech/api/v2";

   getBaseHost() {
      return this.basehost;
   }

   getResourceURL(url: string) {
      url = url.startsWith("/") ? url : `/${url}`;
      return `${this.basehost}/resources${url}`;
   }
}
