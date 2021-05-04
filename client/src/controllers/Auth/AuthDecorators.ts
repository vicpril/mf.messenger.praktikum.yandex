import { AuthController } from "./AuthController";

export function AuthOnly(_: any, _2: string, descriptor: PropertyDescriptor) {
   const oridinalMethod = descriptor.value;

   const authCookie = sessionStorage.getItem("authCookie");
   const uuid = sessionStorage.getItem("uuid");

   descriptor.value = function (...args: any[]) {
      if (AuthController.isAuth() && authCookie && uuid) {
         oridinalMethod.apply(args);
      }
   };

   return descriptor;
}
