import { LeftSidebarViews } from "../../controllers/LeftSidebar/LeftSidebarViews";
import { TChat } from "../../models/Chat";
import { TUser } from "../../models/User";

export type TState = {
   title?: string;
   rightSidebar?: TRightSidebarState;
   leftSidebar?: TLeftSidebarState;
   chats?: TChatsState;
   accountSettings?: TAccountState;
   session?: { login?: string };
};

export type TRightSidebarState = {
   status?: "open" | "close";
   componentName?: string;
   chat?: TChat;
};

export type TLeftSidebarState = {
   view?: LeftSidebarViews;
};

export type TAccountState = TUser;

export type TSessionState = {
   login?: string | null;
};

export type TChatsState = {
   selectedChatId?: number | null;
   availableChats?: TChat[];
};
