import { Component } from "../../core/Component";
import { rootReducer } from "../../core/store/rootReducer";
import { createStore } from "../../core/store/Store";
import { AppService } from "../../services/AppService";
import { isEmpty } from "../../utils/isEmpty";
import { mergeDeep, Indexed } from "../../utils/mergeDeep";
import { getFormData } from "../../utils/pure-functions";
import * as actions from "../../core/store/actions";
import { TAccount } from "../../models/types";
import { TAccountState } from "../../core/store/stateTypes";

export class AccountController {
   private state: TAccountState | {} = AccountController.getState();

   constructor(private component: Component) {}

   static getState(): TAccountState | {} {
      return createStore(rootReducer).getState().accountSettings ?? {};
   }

   update(form: FormData): void {
      console.log("Form Account settings:", this.component.props.form);
      const newSettings = getFormData(form) as Indexed;
      const data = mergeDeep(this.component.props.account, newSettings);
      this.component.$dispatch(actions.accountSettingsUpdate(data));
   }

   changePassword(form: FormData): void {
      console.log(
         "Change password form settings data:",
         this.component.props.form
      );
      const { new_password: password } = getFormData(form) as Indexed;
      const data = mergeDeep(this.component.props.account, { password });
      this.component.$dispatch(actions.accountPasswordChange(data));
   }

   static getAccount(): TAccount | {} {
      const account = AccountController.getState();
      return !isEmpty(account) ? account : AppService.getAccount();
   }
}
