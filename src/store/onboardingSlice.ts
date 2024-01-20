import { StateCreator } from 'zustand';

import { storage } from '../../App';

export interface OnboardingSlice {
  alreadyViewedOnboarding: boolean;
  markAsViewed: () => void;
  markAsUnviewed: () => void;
  onLoadOnboarding: () => void;
}

export const createOnboardingSlice: StateCreator<OnboardingSlice> = set => ({
  alreadyViewedOnboarding: false,
  markAsViewed: async () => {
    await storage.set(
      '@blissfeed:alreadyViewedOnboarding',
      JSON.stringify(true),
    );
    set({ alreadyViewedOnboarding: true });
  },
  markAsUnviewed: async () => {
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
