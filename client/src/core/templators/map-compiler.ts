import { TMap, TTag } from "./tags-map-builder";

type start = string;
type end = string;

export class MapCompiler {
   constructor(private templte: string, private map: TMap) {}

   combineMap(): [number, number][] {
      const result = [];

      while (this.map.size > 1) {
         const arr = [...this.map.entries()];

         for (let index = 0; index < arr.length - 1; index++) {
            if (arr[index][1] === "open" && arr[index + 1][1] === "close") {
               const start = arr[index][0];
               const end = arr[index + 1][0];
               result.push([start, end]);
               this.map.delete(start);
               this.map.delete(end);
               break;
            }
         }
      }

      return result;
   }
}
