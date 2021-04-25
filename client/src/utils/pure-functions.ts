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

   // eslint-disable-next-line no-restricted-syntax
   for (const key of keys) {
      let value;
      // check on array with index
      // like chats[2]
      const split = key.split(/[[\]]+/gi);

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
      // eslint-disable-next-line no-bitwise
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
   }
   return hash;
}

function intToRGB(i: number): TColor {
   // eslint-disable-next-line no-bitwise
   const c = (i & 0x00ffffff).toString(16).toUpperCase();
   return `#${"00000".substring(0, 6 - c.length) + c}`;
}

export function first<T>(list: T[]): T {
   if (!Array.isArray(list) || list.length === 0) return {} as T;
   return list[0];
}

export function getUrlParameter(key: string): string | null {
   // eslint-disable-next-line no-restricted-globals
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

export function strToLodash(string: string): string {
   return string.toLowerCase().replace(/\s/gi, "_");
}

export function lodashToStr(string: string): string {
   string = string.replace(/_/gi, " ");
   return string.charAt(0).toUpperCase() + string.slice(1);
}

export function removeNonCSSSymbolsFromStr(highstack: string): string {
   return highstack.replace(/[;:.,&%@#]/, "");
}

export function arrayUnique(arr: any[]): any[] {
   const set = new Set(arr);
   return Array.from(set);
}

export function isArray(value: unknown): value is [] {
   return Array.isArray(value);
}

type PlainObject<T = unknown> = {
   [k in string]: T;
};

export function isPlainObject(value: unknown): value is PlainObject {
   return (
      typeof value === "object" &&
      value !== null &&
      value.constructor === Object &&
      Object.prototype.toString.call(value) === "[object Object]"
   );
}

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
   return isPlainObject(value) || isArray(value);
}

export type Indexed<T = unknown> = {
   [key in string]: T;
};

export function isEqual(a: Indexed, b: Indexed): boolean {
   const isObject = (obj: any) => !!obj && obj.constructor === Object;

   if (!isObject(a) || !isObject(b)) {
      if (!Array.isArray(a) || !Array.isArray(b)) return a === b;
   }

   if (
      Object.getOwnPropertyNames(a).length !==
      Object.getOwnPropertyNames(b).length
   )
      return false;

   let result = true;
   Object.getOwnPropertyNames(a).forEach((key: string) => {
      if (!isEqual(a[key] as Indexed, b[key] as Indexed)) {
         result = false;
      }
   });
   return result;
}
