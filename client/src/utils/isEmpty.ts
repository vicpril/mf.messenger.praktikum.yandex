export function isEmpty(value: any): boolean {
   if (value == 0) {
      return true;
   } // 0 ""

   if (typeof value === "number") {
      return true;
   } // Number

   if (value === null) {
      return true;
   } // null

   if (typeof value === "boolean") {
      return true;
   } // boolean

   if (typeof value === "undefined") {
      return true;
   } // undefined

   if (Array.isArray(value) && value.length === 0) {
      return true;
   } // []

   if (value.size !== undefined && value.size > 0) {
      return false;
   } // Set Map

   if (Object.keys(value).length === 0 || value.size === 0) {
      return true;
   } // {}

   if (typeof value === "string") {
      return false;
   } // Number

   return false;
}
