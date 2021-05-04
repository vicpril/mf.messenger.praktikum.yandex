import { Component } from "../../core/Component";
import { isEmpty } from "../../utils/isEmpty";
import { isSuccess } from "../../utils/pure-functions";
import * as actions from "../../core/store/actions";
import { TAccountState } from "../../core/store/stateTypes";
import { AuthAPI } from "../../core/xhr/AuthAPI";
import { User } from "../../models/User";
import { Store } from "../../core/store/Store";
import { verify } from "../../core/validator/form";
import { UsersAPI } from "../../core/xhr/UsersAPI";
import { Actions } from "../../core/store/actionTypes";
import { NoticeStatus, notify } from "../../core/notify/notify";
import { specialcharsObject } from "../../utils/htmlspecialchars";

export class AccountController {
   constructor(private component: Component) {}

   static getState(): TAccountState | {} {
      return Store.get().getState().accountSettings ?? {};
   }

   async update(formData: FormData) {
      if (verify(this.component)()) {
         try {
            const userdata = {
               first_name: formData.get("first_name")?.toString() ?? "",
               second_name: formData.get("second_name")?.toString() ?? "",
               login: formData.get("login")?.toString() ?? "",
               email: formData.get("email")?.toString() ?? "",
               display_name: formData.get("display_name")?.toString() ?? "",
               phone: formData.get("phone")?.toString() ?? "",
            };

            const cleardata = specialcharsObject(userdata);

            const { status, data } = await new UsersAPI().update(cleardata);
            if (isSuccess(status)) {
               this.component.$dispatch({
                  type: Actions.ACCOUNT_SETTINGS_UPDATE,
                  data: data,
               });
               this.component.$dispatch(
                  actions.setSession({ login: data.login })
               );
               notify(
                  "Settings was updated successfuly",
                  NoticeStatus.SUCCESS,
                  3000
               );
            }
         } catch (error) {
            console.warn(error);
         }
      }
   }

   async changePassword(formData: FormData) {
      if (verify(this.component)()) {
         try {
            const userdata = {
               oldPassword: formData.get("old_password")?.toString() ?? "",
               newPassword: formData.get("new_password")?.toString() ?? "",
            };

            const { status } = await new UsersAPI().changePassword(userdata);
            if (isSuccess(status)) {
               this.component.$dispatch({
                  type: Actions.ACCOUNT_PASSWORD_CHANGE,
               });
               notify(
                  "Your password was updated successfuly",
                  NoticeStatus.SUCCESS,
                  3000
               );
            }
         } catch (error) {
            console.warn(error);
         }
      }
   }

   async changeAvatar(formData: FormData) {
      try {
         const { status, data } = await new UsersAPI().changeAvatar(formData);
         if (isSuccess(status)) {
            this.component.$dispatch({
               type: Actions.ACCOUNT_SETTINGS_UPDATE,
               data,
            });
            notify(
               "Your avatar was updated successfuly",
               NoticeStatus.SUCCESS,
               3000
            );
            this.component.$emit(this.component.EVENTS.UPDATE);
         }
      } catch (error) {
         console.warn(error);
      }
   }

   static getAccount(): User | {} {
      const account = AccountController.getState();
      return !isEmpty(account) ? account : AccountController.fetch();
   }

   static async fetch() {
      try {
         const { data } = await new AuthAPI().account();
         if (data) {
            const user = new User(data);
            Store.get().dispatch(actions.accountSettingsUpdate(user));
            Store.get().dispatch(actions.setSession({ login: user.login }));
            return user;
         }
         Store.get().dispatch(actions.setSession());
      } catch (error) {
         console.warn(error);
         Store.get().dispatch(actions.setSession());
      }
   }
}
