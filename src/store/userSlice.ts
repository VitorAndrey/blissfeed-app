import { StateCreator } from 'zustand';

import { User } from '@models/user';

import { storage } from '../../App';

export interface UserSlice {
  user: User | null;
  isUserLogged: boolean;
  handleLogOut: () => void;
  handleLogIn: (user: User) => void;
  handleOnLoadUser: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = set => ({
  user: null,
  isUserLogged: false,

  handleLogOut: async () => {
    await storage.delete('@blissfeed:user');
    set({ user: null, isUserLogged: false });
  },
  handleLogIn: async user => {
    await storage.set('@blissfeed:user', JSON.stringify(user));
    set({ user, isUserLogged: true });
  },
  handleOnLoadUser: async () => {
    const jsonUser = await storage.getString('@blissfeed:user');
    if (jsonUser) {
      set({ user: JSON.parse(jsonUser), isUserLogged: true });
    } else {
      set({ user: null, isUserLogged: false });
    }
  },
});
