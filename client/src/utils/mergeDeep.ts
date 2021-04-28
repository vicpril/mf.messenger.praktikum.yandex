export type Indexed<T = unknown> = {
   [key in string]: T;
};

export function mergeDeep(target: Indexed, source: Indexed): Indexed {
   const isObject = (obj: any) => !!obj && obj.constructor === Object;

   if (!isObject(target) || !isObject(source)) {
      return source;
   }

   Object.keys(source).forEach((key) => {
      const targetValue = target[key] as Indexed;
      const sourceValue = source[key] as Indexed;

      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
         target[key] = targetValue.concat(sourceValue);
      } else if (isObject(targetValue) && isObject(sourceValue)) {
         target[key] = mergeDeep({ ...targetValue }, sourceValue);
      } else {
         target[key] = sourceValue;
      }
   });

   return target;
}
