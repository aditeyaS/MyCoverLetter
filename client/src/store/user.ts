import { create } from "zustand";

import User from "@/models/user";

type Store = {
  user: User | null;
  isLoggedIn: boolean;
  loginUser: (user: User) => void;
  logoutUser: () => void;
};

const useUser = create<Store>()((set) => ({
  user: null,
  isLoggedIn: false,
  loginUser: (user) => set({ user, isLoggedIn: true }),
  logoutUser: () => set({ user: null, isLoggedIn: false }),
}));

export default useUser;
