import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../lib/firebase";

const SESSION_KEY = "@auth_session";

type AuthState = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  getToken: () => Promise<string | null>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  getToken: async () => {
    return auth.currentUser ? auth.currentUser.getIdToken() : null;
  },
  logout: async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
    await signOut(auth);
    set({ user: null });
  },
}));

export const saveSession = async (email: string, password: string) => {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify({ email, password }));
};

export const initAuthListener = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      useAuthStore.getState().setUser(user);
      return;
    }

    // user null → show login immediately, then try auto-login in background
    useAuthStore.getState().setUser(null);

    AsyncStorage.getItem(SESSION_KEY)
      .then((raw) => {
        if (!raw) return;
        const { email, password } = JSON.parse(raw);
        return signInWithEmailAndPassword(auth, email, password);
      })
      .catch(() => {
        AsyncStorage.removeItem(SESSION_KEY);
      });
  });
};
