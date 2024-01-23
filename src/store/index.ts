import { create } from 'zustand';

import { ConversationSlice, createConversationSlice } from './conversation';
import { createOnboardingSlice, OnboardingSlice } from './onboardingSlice';
import { createSearchingSlice, SearchingSlice } from './searchingSlice';
import { createUserSlice, UserSlice } from './userSlice';

export const useBoundStore = create<
  UserSlice & OnboardingSlice & SearchingSlice & ConversationSlice
>()((...a) => ({
  ...createUserSlice(...a),
  ...createOnboardingSlice(...a),
  ...createSearchingSlice(...a),
  ...createConversationSlice(...a),
}));
