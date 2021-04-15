export interface IFormControls {
   controls: {
      [key: string]: IControl;
   };
   valid: boolean;
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
