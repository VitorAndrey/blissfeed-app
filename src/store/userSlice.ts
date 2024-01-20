import { StateCreator } from 'zustand';

import { CreateUser, User } from '@models/index';

export interface UserSlice {
  user: User | null;
  isUserLogged: boolean;
  logOut: () => void;
  logIn: (user: CreateUser) => void;
}

export const createUserSlice: StateCreator<UserSlice> = set => ({
  user: null,
  isUserLogged: this.user ? true : false,
  logOut: () => set({ user: null }),
  logIn: user => set({ user }),
});
