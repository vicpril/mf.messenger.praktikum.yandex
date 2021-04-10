import { isEmpty } from "./isEmpty";

export function capitalize(string: string) {
   if (typeof string !== "string") {
      return "";
   }
   return string.charAt(0).toUpperCase() + string.slice(1);
}

export function camelToDashCase(string: string): string {
   return string.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function capToDashCase(string: string): string {
   return camelToDashCase(string).slice(1);
}

export function dashToCap(string: string): string {
   return string.split("-").map(firstToUpper).join("");
}

function firstToUpper(string: string): string {
   return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Get object's field by string
 *
 * @param  {Object} obj
 * @param  {String} str
 * @param  {any} defaultValue
 */
export function get(obj: any, str: string, defaultValue?: any): any {
   if (!str || isEmpty(obj)) {
      return defaultValue;
   }
   const keys = str.split(".");
   let result = obj;

   for (const key of keys) {
      let value;
      // check on array with index
      // like chats[2]
      const split = key.split(/[\[\]]+/gi);

      if (split.length > 1) {
         value = result[split[0]][split[1]]; // get from array
      } else {
         value = result[key];
      }

      if (typeof value === "undefined") {
         return defaultValue;
      }

      result = value;
   }

   return typeof result !== "undefined" ? result : defaultValue;
}

export function getUniqueStr(): string {
   return Math.random().toString(36).substr(2, 9);
}

export function isUndefined(value: any): boolean {
   return typeof value === "undefined";
}

export function trimQuotes(text: string): string {
   const regExp = /^["'](.+(?=["']$))["']$/gi;
   return text.replace(regExp, "$1");
}

type TColor = string;
export function strToColor(str: string): TColor {
   return intToRGB(hashCode(str));
}

function hashCode(str: string): number {
   if (!str) return 0;
   // java String#hashCode
   let hash = 0;
   for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
   }
   return hash;
}

function intToRGB(i: number): TColor {
   const c = (i & 0x00ffffff).toString(16).toUpperCase();
   return `#${"00000".substring(0, 6 - c.length) + c}`;
}

export function first<T>(list: T[]): T {
   if (!Array.isArray(list) || list.length === 0) return {} as T;
   return list[0];
}

export function getUrlParameter(key: string): string | null {
   const url = new URL(location.href);
   return url.searchParams.get(key);
}

export function strContains(
   needle: string,
   highstack: string,
   strict: boolean = true
): boolean {
   if (!strict) {
      highstack = highstack.toLowerCase();
      needle = needle.toLowerCase();
   }
   return highstack.indexOf(needle) !== -1;
}

export function getFormData(formData: FormData): Object {
   return [...formData.entries()].reduce(
      (obj, pair) => Object.assign(obj, { [pair[0]]: pair[1] }),
      {}
   );
}
