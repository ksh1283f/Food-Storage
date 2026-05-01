import { useColorScheme } from "@/hooks/use-color-scheme";
import { setupNotifications } from "@/src/services/notification";
import { initAuthListener, useAuthStore } from "@/src/store/authStore";
import { useDishStore } from "@/src/store/useDishStore";
import { COLORS, TYPO } from "@/src/theme/designSystem";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";
import "react-native-get-random-values";
import "react-native-reanimated";

function AuthGate() {
  const router = useRouter();
  const segments = useSegments();
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [user, loading, segments]);

  if (loading) return <View style={{ flex: 1, backgroundColor: COLORS.bg }} />;

  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const load = useDishStore((s) => s.load);

  useEffect(() => {
    initAuthListener();
    load();
    setupNotifications();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthGate />
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="add"
          options={{
            title: "반찬 추가",
            headerStyle: { backgroundColor: COLORS.bg },
            headerShadowVisible: true,
            headerTitleStyle: { ...TYPO.subtitle, color: COLORS.text },
          }}
        />
        <Stack.Screen
          name="[id]"
          options={{
            title: "상세",
            headerStyle: { backgroundColor: COLORS.bg },
            headerShadowVisible: true,
            headerTitleStyle: { ...TYPO.subtitle, color: COLORS.text },
            headerBackButtonDisplayMode: "minimal",
          }}
        />
        <Stack.Screen
          name="recipe/[id]"
          options={{
            title: "레시피",
            headerStyle: { backgroundColor: COLORS.bg },
            headerShadowVisible: false,
            headerTitleStyle: { ...TYPO.subtitle, color: COLORS.text },
            headerBackButtonDisplayMode: "minimal",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
