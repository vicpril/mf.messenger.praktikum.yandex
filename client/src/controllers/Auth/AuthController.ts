import { DefaultPage } from "../../components/pages/DefaultPage/DefaultPage";
// eslint-disable-next-line import/no-cycle
import { SignIn } from "../../components/pages/SignIn/SignIn";
// eslint-disable-next-line import/no-cycle
import { SignUp } from "../../components/pages/SignUp/SignUp";
import { Component } from "../../core/Component";
import { Router } from "../../core/router/Router";
import { Actions } from "../../core/store/actionTypes";
import { Store } from "../../core/store/Store";
import { verify } from "../../core/validator/form";
import { AuthAPI } from "../../core/xhr/AuthAPI";
import { isSuccess } from "../../utils/pure-functions";

export class AuthController {
   constructor(private component: Component) {}

   static indexSignIn() {
      return { ...DefaultPage, ...{ components: [SignIn] } };
   }

   static indexSignUp() {
      return { ...DefaultPage, ...{ components: [SignUp] } };
   }

   async login(formData: FormData) {
      try {
         if (verify(this.component)()) {
            const options = {
               data: {
                  login: formData.get("login")?.toString() ?? "",
                  password: formData.get("password")?.toString() ?? "",
               },
            };

            const { status } = await new AuthAPI().login(options);
            if (isSuccess(status)) {
               this.component.$dispatch({
                  type: Actions.AUTH_SIGN_IN,
                  data: options.data.login,
               });
               Router.navigate("chats");
            }
         }
      } catch (error) {
         console.warn(error);
      }
   }

   static async logout() {
      try {
         const { status } = await new AuthAPI().logout();
         if (isSuccess(status)) {
            Store.get().dispatch({
               type: Actions.AUTH_LOGOUT,
            });
            Router.navigate("signin");
         }
      } catch (error) {
         console.warn(error);
      }
   }

   async register(formData: FormData) {
      try {
         if (verify(this.component)()) {
            const options = {
               data: {
                  first_name: formData.get("first_name")?.toString() ?? "",
                  second_name: formData.get("second_name")?.toString() ?? "",
                  login: formData.get("login")?.toString() ?? "",
                  email: formData.get("email")?.toString() ?? "",
                  password: formData.get("password")?.toString() ?? "",
                  phone: formData.get("phone")?.toString() ?? "",
               },
            };

            const { status } = await new AuthAPI().register(options);
            if (isSuccess(status)) {
               this.component.$dispatch({
                  type: Actions.AUTH_SIGN_IN,
                  data: options.data.login,
               });
               Router.navigate("chats");
            }
         }
      } catch (error) {
         console.warn(error);
      }
   }
}
