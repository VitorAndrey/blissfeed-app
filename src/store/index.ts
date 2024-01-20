import { create } from 'zustand';

import { createOnboardingSlice, OnboardingSlice } from './onboardingSlice';
import { createUserSlice, UserSlice } from './userSlice';

export const useBoundStore = create<UserSlice & OnboardingSlice>()((...a) => ({
  ...createUserSlice(...a),
  ...createOnboardingSlice(...a),
}));
