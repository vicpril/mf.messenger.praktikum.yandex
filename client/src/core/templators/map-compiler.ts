import { TMap } from "./tags-map-builder";

export class MapCompiler {
   constructor(private map: TMap) {}

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

      return result as [number, number][];
   }
}
