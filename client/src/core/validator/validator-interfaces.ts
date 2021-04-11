export interface IFormControls {
   [key: string]: IControl;
}

export interface IControl {
   valid: boolean;
   value: any;
   errors?: TErrors;
   touched: boolean;
}

export interface IFormField {
   value: any;
   validators?: {
      [key: string]: (...args: any) => any;
   };
}

export type TErrors = {
   [key: string]: {
      isError: boolean;
      message: string;
   };
};
