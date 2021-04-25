export function storage(key: string, data: any = null) {
   if (!data) {
      return JSON.parse(localStorage.getItem(key) as string);
   }
   localStorage.setItem(key, JSON.stringify(data));
   return true;
}
