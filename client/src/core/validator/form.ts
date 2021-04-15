import { TInputGroup } from "../../components/structural/InputGroup/InputGroup";
import { $ } from "../../utils/dom-abstraction";
import { isEmpty } from "../../utils/isEmpty";
import { first, lodashToStr } from "../../utils/pure-functions";
import { Component } from "../Component";
import { useControl } from "./control";
import { IControl, IFormControls, IFormField } from "./validator-interfaces";

export function useForm(init = {}): IFormControls {
   const form: IFormControls = { valid: true, controls: {} };

   // eslint-disable-next-line no-restricted-syntax
   for (const [key, value] of Object.entries(init)) {
      form.controls[key] = useControl(value as IFormField);
      if (!form.controls[key].valid) {
         form.valid = false;
      }
   }

   return form;
}

export const verify = function (
   componentForm: Component
): (target?: HTMLElement) => boolean {
   return (target?: HTMLElement): boolean => {
      const verifyControl = (control: IControl, name: string): boolean => {
         control.touched = true;

         const field: Component = first(
            componentForm.componentsInst.filter(
               (c: Component) => c.props.options.id === name
            )
         );
         field.props.control = control;

         if (!isEmpty(field)) {
            componentForm.$emit(field.EVENTS.UPDATE);
         }
         return control.valid;
      };

      const form = useForm(componentForm.props.form);

      if (form.controls) {
         if (target) {
            const control = form.controls[target.id];
            return verifyControl(control, target.id);
         }

         Object.getOwnPropertyNames(componentForm.props.form).forEach(
            (id: string) => {
               const target = componentForm.$root.find(`#${id}`).$el;
               if (form.controls) {
                  const control = form.controls[target.id];
                  verifyControl(control, target.id);
               }
            }
         );
      }

      return form.valid;
   };
};

export function checkInputForm(target: HTMLElement, form: {}): boolean {
   const ids = Object.getOwnPropertyNames(form);
   let hasId = false;
   ids.forEach((id: string) => {
      if ($(target).hasId(id)) {
         hasId = true;
      }
   });
   return hasId;
}

export function prepareFormFields(form: IFormField) {
   return Object.getOwnPropertyNames(form).map(
      (key: string) =>
         ({
            title: lodashToStr(key),
            id: key,
            name: key,
            type: key === "password" ? "password" : "text",
         } as TInputGroup)
   );
}
