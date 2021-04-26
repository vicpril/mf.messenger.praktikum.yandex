export class ActiveRoute {
   static get path() {
      // return window.location.hash.slice(1);
      return window.location.pathname;
   }

   static get param() {
      return ActiveRoute.path.split("/")[2];
   }
}
