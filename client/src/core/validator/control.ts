import { TErrors, IControl, IFormField } from "./validator-interfaces";
import { ErrorMesseges } from "./validators";

export function useControl(field: IFormField): IControl {
   let valid: boolean = true;
   const { value } = field;
   const errors: TErrors = {};
   const touched = false;

   Object.getOwnPropertyNames(field.validators ?? {}).forEach(
      (name: string) => {
         if (field.validators) {
            const isValid = field.validators[name](value);
            errors[name] = {
               isError: !isValid,
               message: getErrorReason(field, name),
            };
            if (!isValid) {
               valid = false;
            }
         }
      }
   );

   return {
      valid,
      value,
      errors,
      touched,
   };
}

function getErrorReason(field: IFormField, name: string): string {
   if (field.errorReason && field.errorReason[name]) {
      return field.errorReason[name];
   }

   return typeof ErrorMesseges[name] === "function"
      ? ErrorMesseges[name]()
      : ErrorMesseges[name];
}
