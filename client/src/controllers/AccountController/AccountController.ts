import { Component } from "../../core/Component";
import { isEmpty } from "../../utils/isEmpty";
import { mergeDeep, Indexed } from "../../utils/mergeDeep";
import { getFormData, isSuccess } from "../../utils/pure-functions";
import * as actions from "../../core/store/actions";
import { TAccount } from "../../models/types";
import { TAccountState } from "../../core/store/stateTypes";
import { AuthAPI } from "../../core/xhr/AuthAPI";
import { User } from "../../models/User";
import { Store } from "../../core/store/Store";
import { verify } from "../../core/validator/form";
import { UsersAPI } from "../../core/xhr/UsersAPI";
import { Actions } from "../../core/store/actionTypes";
import { NoticeStatus, notify, notifyError } from "../../core/notify/notify";

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

            const { status, data } = await new UsersAPI().update(userdata);
            if (isSuccess(status)) {
               this.component.$dispatch({
                  type: Actions.ACCOUNT_SETTINGS_UPDATE,
                  data: data,
               });
               notify(
                  "Settings was updated successfuly",
                  NoticeStatus.SUCCESS,
                  3000
               );
            }
         } catch (error) {
            console.warn(error);
         }

         // const newSettings = getFormData(form) as Indexed;
         // const data = mergeDeep(this.component.props.account, newSettings);
         // this.component.$dispatch(actions.accountSettingsUpdate(data));
      }
   }

   changePassword(form: FormData): void {
      const { new_password: password } = getFormData(form) as Indexed;
      const data = { password };
      this.component.$dispatch(actions.accountPasswordChange(data));
   }

   static getAccount(): TAccount | {} {
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
         } else {
            // AuthController.logout();
            Store.get().dispatch(actions.setSession());
         }
      } catch (error) {
         console.warn(error);
         Store.get().dispatch(actions.setSession());
      }
   }
}
