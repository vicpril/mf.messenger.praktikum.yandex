export function htmlspecialchars(str: string): string {
   if (typeof str === "string") {
      str = str
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
   }
   return str;
}

export function specialcharsObject<T, K extends keyof T>(obj: T): T {
   const reducer = (acc: any, key: K) => {
      if (typeof obj[key] === "string") {
         acc[key] = htmlspecialchars(obj[key] as unknown as string) as string;
      } else {
         acc[key] = obj[key];
      }

      return acc as T;
   };

   const result = Object.getOwnPropertyNames(obj).reduce(reducer as any, {});

   return result as T;
}
