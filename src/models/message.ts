export interface Message {
  id: string;
  content: string;
  sent_by_user: boolean;
  timestamp: Date;
  conversation_id: string;
  publishable: boolean;
}
export interface CreateMessage {
  id?: string | undefined;
  conversation_id: string;
  content: string;
  sent_by_user: boolean;
  publishable: boolean;
}
