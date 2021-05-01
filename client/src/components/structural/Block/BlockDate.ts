import { IBlock } from "./BlockInterface";

export class BlockDate implements IBlock {
   type: "date" | "messages";
   date: Date;
   constructor(time: string) {
      this.type = "date";
      this.date = new Date(+Date.parse(time));
   }

   get content(): string {
      return this.date.toLocaleDateString();
   }
}

export function isSameDayBlocks(first: BlockDate, second: BlockDate): boolean {
   return first.content === second.content;
}
