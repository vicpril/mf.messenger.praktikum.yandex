import { UsersAPI } from "../../core/xhr/UsersAPI";
import { User, UserFields } from "../../models/User";
import { isSuccess } from "../../utils/pure-functions";

export class UsersController {
   static async get(id: number) {
      try {
         const { status, data } = await new UsersAPI().get(id);
         if (isSuccess(status)) {
            return new User(data);
         }
      } catch (error) {
         console.warn(error);
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
