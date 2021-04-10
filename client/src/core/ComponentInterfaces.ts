import { ISubscriberMethods } from "./Emmiter";

interface IBase {
   [key: string]: any;
}

export type TMethod = (e?: Event) => void;

export interface IMethods {
   [key: string]: TMethod;
}

export interface IBaseMethods extends IBase {
   beforePrepare?: TMethod;
   beforeCreate?: TMethod;
   beforeMount?: TMethod;
   beforeInit?: TMethod;
   afterInit?: TMethod;
   beforeUpdate?: TMethod;
   beforeDestroy?: TMethod;
}
export interface IIngredients extends IBaseMethods {
   name: string;
   template?: string;
   components?: IIngredients[];
   listeners?: string[];
   subscribers?: ISubscriberMethods;
   props?: {};
   methods?: IMethods;
}

export interface IComponentLifeCycleNames {
   BEFORE_CREATE: string;
   BEFORE_MOUNT: string;
   BEFORE_INIT: string;
   AFTER_INIT: string;
   UPDATE: string;
   DESTROY: string;
}
