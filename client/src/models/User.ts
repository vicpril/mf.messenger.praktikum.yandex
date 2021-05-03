import { UserResponse } from "../core/xhr/UsersAPI";

export type UserFields = UserResponse;

export type TUser = User;

export class User {
   id: number;
   first_name: string;
   second_name: string;
   display_name: string;
   login: string;
   email: string;
   phone: string;
   avatar: string;
   role?: "admin" | "regular" | null;

   constructor(data: UserResponse) {
      this.id = data.id;
      this.first_name = data.first_name;
      this.second_name = data.second_name;
      this.display_name = data.display_name ?? data.login;
      this.login = data.login;
      this.email = data.email;
      this.phone = data.phone;
      this.avatar = data.avatar;
      this.role = data.role ?? null;
   }
}

export function isSameUsers(first: TUser, second: TUser): boolean {
   return first.id === second.id;
}
