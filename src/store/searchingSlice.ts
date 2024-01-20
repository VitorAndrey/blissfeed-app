import { StateCreator } from 'zustand';

export interface SearchingSlice {
  isSearchInputFocused: boolean;
  handleSearchInputFocus: () => void;
  handleSearchInputBlur: () => void;
}

export const createSearchingSlice: StateCreator<SearchingSlice> = set => ({
  isSearchInputFocused: false,
  handleSearchInputFocus: () => {
    set({ isSearchInputFocused: true });
  },
  handleSearchInputBlur: () => {
    set({ isSearchInputFocused: false });
  },
});
