import { LeftSidebarViews } from "../../controllers/LeftSidebar/LeftSidebarViews";
import { TChat } from "../../models/Chat";
import { TMessage } from "../../models/Message";
import { TUser } from "../../models/User";

export type TState = {
   checkNewMessageInterval?: number;
   rightSidebar?: TRightSidebarState;
   leftSidebar?: TLeftSidebarState;
   chats?: TChatsState;
   users?: TUserState;
   selectedChatId?: number | null;
   accountSettings?: TAccountState;
   session?: { login?: string };
   tokens?: {
      [chatId: number]: string;
   };
   messenger?: TMessengerState;
   fileAttachForm?: TFileAttachState;
};

export type TRightSidebarState = {
   status?: "open" | "close";
   componentName?: string;
   chat?: TChat;
};

export type TLeftSidebarState = {
   view?: LeftSidebarViews;
};

export type TFile = {
   id: number;
   user_id: number;
   path: string;
   filename: string;
   content_type: string;
   content_size: number;
   upload_date: string;
};

export type TFileAttachState = {
   status?: "open" | "close";
   file?: TFile;
};

export type TAccountState = TUser;

export type TSessionState = {
   login?: string | null;
};

export type TChatsState = {
   availableChats?: TChat[];
};

export type TMessengerState = {
   [chatId: number]: TMessage[];
};

export type TUserState = {
   [userId: number]: TUser;
};
