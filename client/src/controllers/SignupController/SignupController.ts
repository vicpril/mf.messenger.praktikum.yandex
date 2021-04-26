import { DefaultPage } from "../../components/pages/DefaultPage/DefaultPage";
import { SignUp } from "../../components/pages/SignUp/SignUp";

export class SignupController {
   static index() {
      return { ...DefaultPage, ...{ components: [SignUp] } };
   }
}
