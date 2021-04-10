import { TMessage } from "../models/types";

export class DateCustom extends Date {
   constructor(timestemp: string | number) {
      super(+timestemp);
   }

   get getTimeFormatted() {
      const hh = `0${this.getHours()}`.slice(-2);
      const mm = `0${this.getMinutes()}`.slice(-2);
      return `${hh}:${mm}`;
   }

   get getDateFormatted() {
      const DD = `0${this.getDate()}`.slice(-2);
      const MM = `0${this.getMonth() + 1}`.slice(-2);
      const YYYY = this.getFullYear();
      return `${DD}.${MM}.${YYYY}`;
   }
}

export function mapMessageDateCustom(message: TMessage) {
   message.time = new DateCustom(+message.time);
   return message;
}
