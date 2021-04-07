import { isEmpty } from "./isEmpty";

export function compare(post: any, operator: string, value?: any): boolean {
   // debugger
   switch (operator) {
      case ">":
         return post > value;
      case "<":
         return post < value;
      case ">=":
         return post >= value;
      case "<=":
         return post <= value;
      case "==":
         return post == value;
      case "!=":
         return post != value;
      case "===":
         return post === value;
      case "!==":
         return post !== value;
      case "&&":
         return post && value;
      case "||":
         return post || value;
      case "!":
         return !post;
      case null:
      case undefined:
         return post;
      default:
         return false;
   }
}
