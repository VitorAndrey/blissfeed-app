import { StateCreator } from 'zustand';

import { User } from '@models/user';

import { storage } from '../../App';

export interface UserSlice {
  user: User | null;
  isUserLogged: boolean;
  logOut: () => void;
  logIn: (user: User) => void;
  onLoadUser: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = set => ({
  user: null,
  isUserLogged: false,

  logOut: async () => {
    await storage.delete('@blissfeed:user');
    set({ user: null, isUserLogged: false });
  },
  logIn: async user => {
    await storage.set('@blissfeed:user', JSON.stringify(user));
    set({ user, isUserLogged: true });
  },
  onLoadUser: async () => {
    const jsonUser = await storage.getString('@blissfeed:user');
    if (jsonUser) {
      set({ user: JSON.parse(jsonUser), isUserLogged: true });
    } else {
      set({ user: null, isUserLogged: false });
    }
  },
});
