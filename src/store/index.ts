import { create } from 'zustand';

import { createUserSlice, UserSlice } from './userSlice';

export const useBoundStore = create<UserSlice>()((...a) => ({
  ...createUserSlice(...a),
}));
