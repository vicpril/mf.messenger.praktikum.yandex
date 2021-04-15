import { TMessage } from "../models/types";

export function sortByTime(
   messages: TMessage[],
   sort: "asc" | "desc" = "desc"
): TMessage[] {
   return sort === "desc"
      ? messages.sort((a, b) => (a.time < b.time ? 1 : -1))
      : messages.sort((a, b) => (a.time > b.time ? 1 : -1));
}
