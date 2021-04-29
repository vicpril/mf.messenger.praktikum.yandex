type Indexed<T = unknown> = {
   [key in string]: T;
};

function isArray(value: unknown): value is [] {
   return Array.isArray(value);
}

type PlainObject<T = unknown> = {
   [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
   return (
      typeof value === "object" &&
      value !== null &&
      value.constructor === Object &&
      Object.prototype.toString.call(value) === "[object Object]"
   );
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
   return isPlainObject(value) || isArray(value);
}

export function cloneDeep<T extends object>(obj: T): T {
   const store = new Map();

   const cloneDeepAtom = function <T extends object>(obj: T) {
      if (!isArrayOrObject(obj)) {
         return obj;
      }

      // Array
      if (isArray(obj)) {
         const result: any = [];
         store.set(obj, result);

         obj.forEach((item) => {
            if (store.has(item)) {
               result.push(store.get(item));
            } else {
               result.push(cloneDeepAtom(item));
            }
         });
         return result as T;
      }
      // Object
      if (isPlainObject(obj)) {
         const result: any = {};
         store.set(obj, result);
         // eslint-disable-next-line no-restricted-syntax
         for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
               const item = obj[key];
               if (store.has(item)) {
                  result[key] = store.get(item);
               } else {
                  result[key] = cloneDeepAtom(item as object);
               }
            }
         }
         return result as T;
      }
   };

   const result = cloneDeepAtom(obj);

   store.clear();
   return result as T;
}
