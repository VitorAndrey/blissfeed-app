import { StateCreator } from 'zustand';

import { Conversation } from '@models/Conversation';

import { storage } from '../../App';

export interface ConversationSlice {
  conversation: Conversation | null;
  handleSetConversation: (data: Conversation) => void;
  handleOnLoadConversation: () => void;
}

export const createConversationSlice: StateCreator<
  ConversationSlice
> = set => ({
  conversation: null,
  messagesList: [],
  handleSetConversation: data => {
    storage.set('@blissfeed:conversation', JSON.stringify(data));
    set({ conversation: data });
  },
  handleOnLoadConversation: () => {
    const jsonConversation = storage.getString('@blissfeed:conversation');
    if (jsonConversation) {
      set({
        conversation: JSON.parse(jsonConversation),
      });
    } else {
      set({ conversation: null });
    }
  },
});
