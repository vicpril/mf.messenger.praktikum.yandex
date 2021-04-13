enum METHOD {
   GET = "GET",
   POST = "POST",
   PUT = "PUT",
   PATCH = "PATCH",
   DELETE = "DELETE",
}

/**
 * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
 * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
 * @param  {{[key:string]:any}} data
 */
function queryStringify(data: { [key: string]: any }): string {
   if (Object.getOwnPropertyNames(data).length === 0) return "";

   const paramToStr = function (key: string) {
      const value = Array.isArray(data[key]) ? data[key].join(",") : data[key];
      return `${key}=${value}`;
   };

   return `?${Object.getOwnPropertyNames(data).map(paramToStr).join("&")}`;
}

type Options = {
   method: METHOD;
   headers?: {
      [key: string]: any;
   };
   timeout?: number;
   data?:
      | {
           [key: string]: any;
        }
      | FormData;
   responseType?: XMLHttpRequestResponseType;
   onProgress?: (event: ProgressEvent) => void;
   onUploadProgress?: (event: ProgressEvent) => void;
   beforeRequest?: (event?: ProgressEvent) => void;
   withCredentials?: boolean;
};

// Тип Omit принимает два аргумента: первый — тип, второй — строка
// и удаляет из первого типа ключ, переданный вторым аргументом
type OptionsWithoutMethod = Omit<Options, "method">;

export default class XHR {
   private static request(url: string, options: Options, timeout = 5000) {
      const { method, data, headers } = options;

      return new Promise<XMLHttpRequestResponseType>((resolve, reject) => {
         const xhr = new XMLHttpRequest();

         xhr.open(method, url);
         // xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
         xhr.responseType = options.responseType ?? "json";
         if (options.withCredentials) {
            xhr.withCredentials = options.withCredentials;
         }

         xhr.onload = function () {
            if (xhr.status >= 400) {
               reject(xhr.response);
            } else {
               resolve(xhr.response);
            }
         };
         xhr.onabort = reject;
         xhr.onerror = reject;
         xhr.ontimeout = reject;

         // начало запроса
         xhr.onloadstart = function () {
            if (options.beforeRequest) {
               options.beforeRequest();
            }
         };

         // процесс загрузки
         xhr.onprogress = function (event: ProgressEvent) {
            if (options.onProgress) {
               options.onProgress(event);
               // if (event.lengthComputable) {
               //    console.log(`Получено ${event.loaded} из ${event.total} байт`);
               // } else {
               //    console.log(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
               // }
            }
         };

         // процесс отправки
         xhr.upload.onprogress = function (event) {
            if (options.onUploadProgress) {
               options.onUploadProgress(event);
               // console.log(`Отправлено ${event.loaded} из ${event.total}`);
            }
         };

         if (headers) {
            Object.getOwnPropertyNames(headers).forEach((key) => {
               xhr.setRequestHeader(key, headers[key]);
            });
         }

         xhr.timeout = timeout;

         if (method === METHOD.GET || !data) {
            xhr.send();
         } else if (data instanceof FormData) {
            xhr.send(data);
         } else {
            xhr.setRequestHeader(
               "Content-Type",
               "application/json; charset=utf-8"
            );
            xhr.send(JSON.stringify(data));
         }
      });
   }

   static get(
      url: string,
      options: OptionsWithoutMethod = {}
   ): Promise<XMLHttpRequestResponseType> {
      url = !options.data ? url : url + queryStringify(options.data);
      return XHR.request(
         url,
         { ...options, method: METHOD.GET },
         options.timeout
      );
   }

   static post(url: string, options: OptionsWithoutMethod = {}) {
      return XHR.request(
         url,
         { ...options, method: METHOD.POST },
         options.timeout
      );
   }

   static put(url: string, options: OptionsWithoutMethod = {}) {
      return XHR.request(
         url,
         { ...options, method: METHOD.PUT },
         options.timeout
      );
   }

   static delete(url: string, options: OptionsWithoutMethod = {}) {
      return XHR.request(
         url,
         { ...options, method: METHOD.DELETE },
         options.timeout
      );
   }
}
