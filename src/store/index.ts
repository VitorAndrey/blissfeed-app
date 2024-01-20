import { create } from 'zustand';

import { createOnboardingSlice, OnboardingSlice } from './onboardingSlice';
import { createSearchingSlice, SearchingSlice } from './searchingSlice';
import { createUserSlice, UserSlice } from './userSlice';

export const useBoundStore = create<
  UserSlice & OnboardingSlice & SearchingSlice
>()((...a) => ({
  ...createUserSlice(...a),
  ...createOnboardingSlice(...a),
  ...createSearchingSlice(...a),
}));
