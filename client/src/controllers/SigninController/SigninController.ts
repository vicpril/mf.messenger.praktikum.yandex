import { DefaultPage } from "../../components/pages/DefaultPage/DefaultPage";
import { SignIn } from "../../components/pages/SignIn/SignIn";

export class SigninController {
   static index() {
      return { ...DefaultPage, ...{ components: [SignIn] } };
   }
}
