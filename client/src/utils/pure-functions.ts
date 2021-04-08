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
export function get(obj, str: string, defaultValue?: any): any {
   if (!str || isEmpty(obj)) {
      return defaultValue;
   }
   const keys = str.split(".");
   let result = obj;

   for (let key of keys) {
      const value = result[key];

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
