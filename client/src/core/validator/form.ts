import { TInputGroup } from "../../components/structural/InputGroup/InputGroup";
import { $ } from "../../utils/dom-abstraction";
import { isEmpty } from "../../utils/isEmpty";
import { first, lodashToStr } from "../../utils/pure-functions";
import { Component } from "../Component";
import { useControl } from "./control";
import { IFormControls, IFormField } from "./validator-interfaces";

export function useForm(init = {}): IFormControls {
   const form: IFormControls = {};

   // eslint-disable-next-line no-restricted-syntax
   for (const [key, value] of Object.entries(init)) {
      form[key] = useControl(value as IFormField);
   }

   return form;
}

export const verify = function (componentForm: Component) {
   return (target?: HTMLElement) => {
      const verifyField = (target: HTMLElement) => {
         const form = useForm(componentForm.props.form);
         const name = target.id;
         form[name].touched = true;

         const field: Component = first(
            componentForm.componentsInst.filter(
               (c: Component) => c.props.options.id === name
            )
         );
         field.props.control = form[name];

         if (!isEmpty(field)) {
            componentForm.$emit(field.EVENTS.UPDATE);
         }
      };
      if (target) {
         verifyField(target);
      } else {
         Object.getOwnPropertyNames(componentForm.props.form).forEach(
            (id: string) => {
               const target = componentForm.$root.find(`#${id}`).$el;
               verifyField(target);
            }
         );
      }
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
