import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../lib/firebase";

type AuthState = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },
}));

export const initAuthListener = () => {
  onAuthStateChanged(auth, (user) => {
    useAuthStore.getState().setUser(user);
  });
};
