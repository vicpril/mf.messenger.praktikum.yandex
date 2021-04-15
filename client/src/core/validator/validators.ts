export type TValidators = ["required", "minLength", "email"];

export type TErrorMesseges = {
   [name: string]: any;
};

let minlength = 0;

export const ErrorMesseges: TErrorMesseges = {
   required: "This field is required.",
   minLength: () => `This field's length can't be less then ${minlength}.`,
   email: "This field should be an email.",
   restrictedSymbols: "String contains restricted symbols",
};

export const Validators = {
   required: (val: any): boolean => !!val,
   minLength: (num: number) => {
      minlength = num;
      return (val: string): boolean => val.length >= num;
   },
   email: (val: string): boolean => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(val).toLowerCase());
   },
   restrictedSymbols: (val: string): boolean => {
      const re = /[\\/]/;
      return !re.test(String(val).toLowerCase());
   },
};
