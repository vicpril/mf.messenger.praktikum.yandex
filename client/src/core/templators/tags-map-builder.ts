export type TTag = "open" | "close";
export type TMap = Map<number, TTag>;

export class TagsMapBuilder {
   OPEN_REGEXP: RegExp;
   CLOSE_REGEXP: RegExp;
   result: TMap = new Map();
   constructor(
      private highstack: string,
      private open: string,
      private close: string
   ) {
      this.OPEN_REGEXP = new RegExp(open, "g");
      this.CLOSE_REGEXP = new RegExp(close, "g");
   }

   build(): TMap {
      this._buildOpen();
      this._buildClose();
      return new Map([...this.result.entries()].sort((a, b) => a[0] - b[0]));
   }

   private _buildOpen() {
      let key = null;
      while ((key = this.OPEN_REGEXP.exec(this.highstack))) {
         this.result.set(key.index, "open");
      }
   }

   private _buildClose() {
      let key = null;
      while ((key = this.CLOSE_REGEXP.exec(this.highstack))) {
         this.result.set(key.index + this.close.length, "close");
      }
   }
}
