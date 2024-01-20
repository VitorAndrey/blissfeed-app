import { StateCreator } from 'zustand';

import { storage } from '../../App';

export interface OnboardingSlice {
  alreadyViewedOnboarding: boolean;
  handleAlreadySeenOnboarding: () => void;
  handleHaventSeenOnboarding: () => void;
  onLoadOnboarding: () => void;
}

export const createOnboardingSlice: StateCreator<OnboardingSlice> = set => ({
  alreadyViewedOnboarding: false,
  handleAlreadySeenOnboarding: async () => {
    await storage.set(
      '@blissfeed:alreadyViewedOnboarding',
      JSON.stringify(true),
    );
    set({ alreadyViewedOnboarding: true });
  },
  handleHaventSeenOnboarding: async () => {
    await storage.set(
      '@blissfeed:alreadyViewedOnboarding',
      JSON.stringify(false),
    );
    set({ alreadyViewedOnboarding: false });
  },
  onLoadOnboarding: async () => {
    const jsonAlreadyViewed = await storage.getString(
      '@blissfeed:alreadyViewedOnboarding',
    );
    if (jsonAlreadyViewed) {
      set({ alreadyViewedOnboarding: JSON.parse(jsonAlreadyViewed) });
    }
  },
});
