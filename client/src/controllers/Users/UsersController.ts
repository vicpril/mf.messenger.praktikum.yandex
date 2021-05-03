import { Store } from "../../core/store/Store";
import { UsersAPI } from "../../core/xhr/UsersAPI";
import { User, UserFields } from "../../models/User";
import { isSuccess } from "../../utils/pure-functions";
import * as actions from "../../core/store/actions";
import { isEmpty } from "../../utils/isEmpty";

export class UsersController {
   static getState() {
      return Store.get().getState().users ?? {};
   }

   static async get(id: number): Promise<User | null> {
      const user = UsersController.getState()[id] ?? null;
      return !isEmpty(user) ? user : UsersController.fetch(id);
   }

   static async fetch(id: number): Promise<User | null> {
      try {
         const { status, data } = await new UsersAPI().get(id);
         if (isSuccess(status)) {
            const user = new User(data);
            Store.get().dispatch(actions.saveUsers([user]));
            return user;
         }
         return null;
      } catch (error) {
         console.warn(error);
         return null;
      }
   }

   static async search(login: string) {
      try {
         const { status, data } = await new UsersAPI().search(login);
         if (isSuccess(status)) {
            return data.map((u: UserFields) => new User(u));
         }
      } catch (error) {
         console.warn(error);
      }
   }
}
