export type ApiResponse = {
   status: "success" | "failed";
   data?: any;
};

export type ErrorResponse = {
   reason: string;
};

export class BaseAPI {
   protected basehost: string = "https://ya-praktikum.tech/api/v2";

   create(...args: any): Promise<ApiResponse> {
      throw new Error("Not implemented");
   }

   request(...args: any): Promise<ApiResponse> {
      throw new Error("Not implemented");
   }

   update(...args: any): Promise<ApiResponse> {
      throw new Error("Not implemented");
   }

   delete(...args: any): Promise<ApiResponse> {
      throw new Error("Not implemented");
   }

   getBaseHost() {
      return this.basehost;
   }

   getResourceURL(url: string) {
      url = url.startsWith("/") ? url : `/${url}`;
      return `${this.basehost}/resources${url}`;
   }
}
