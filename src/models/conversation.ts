import { Message } from './message';

export interface Conversation {
  id: string;
  user_id: string;
  messages: Message[];
}

export interface UpdateConversation {
  messages: Message[];
}
