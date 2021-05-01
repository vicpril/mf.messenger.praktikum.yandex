export type TMessage = {
   id?: number; // id сообщения в текущем чате (равен порядковому номеру сообщения в чате)
   chat_id: number;
   time: string;
   type: string;
   user_id: string;
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
