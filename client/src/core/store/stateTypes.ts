import { TAccount } from "../../models/types";

export type TState = {
   title?: string;
   rightSidebar?: TRightSidebarState;
   accountSettings?: TAccountState;
};

export type TRightSidebarState = {
   status?: "open" | "close";
   componentName?: string;
   login?: string;
};

export type TAccountState = TAccount;