import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyDeS4R2IWygUtkuSZITjI6Mja0HYRYMx-U",
  authDomain: "food-storage-9bd85.firebaseapp.com",
  projectId: "food-storage-9bd85",
  storageBucket: "food-storage-9bd85.firebasestorage.app",
  messagingSenderId: "1043747608978",
  appId: "1:1043747608978:web:7aba1839f4fe0954d5c94b",
  measurementId: "G-VB6714NQKS",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

if (Platform.OS === "web" && typeof window !== "undefined") {
  import("firebase/analytics")
    .then(({ isSupported, getAnalytics }) => isSupported().then((ok) => ok && getAnalytics(app)))
    .catch(() => undefined);
}

export const auth = getAuth(app);
