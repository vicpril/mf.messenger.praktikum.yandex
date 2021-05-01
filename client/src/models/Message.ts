export enum MessageTypes {
   MESSAGE = "message",
   FILE = "file",
   USER_CONNECTED = "user connected",
   GET_OLD = "get old",
}

export type TMessage = {
   id?: number; // id сообщения в текущем чате (равен порядковому номеру сообщения в чате)
   chat_id: number;
   time: string;
   type: MessageTypes;
   user_id: number;
   content: string;
   file?: {
      id: number;
      user_id: number;
      path: string;
      filename: string;
      content_type: string;
      content_size: number;
      upload_date: string;
   };
};
