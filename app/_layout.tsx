import 'react-native-get-random-values';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { setupNotifications } from '@/src/services/notification';
import { useDishStore } from '@/src/store/useDishStore';
import { COLORS, TYPO } from '@/src/theme/designSystem';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const load = useDishStore((s) => s.load);

  useEffect(() => {
    load();
    setupNotifications();
  }, [load]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: '냉장고',
            headerStyle: { backgroundColor: COLORS.bg },
            headerShadowVisible: false,
            headerTitleStyle: { ...TYPO.subtitle, color: COLORS.text },
          }}
        />
        <Stack.Screen
          name="add"
          options={{
            title: '반찬 추가',
            headerStyle: { backgroundColor: COLORS.bg },
            headerShadowVisible: false,
            headerTitleStyle: { ...TYPO.subtitle, color: COLORS.text },
          }}
        />
        <Stack.Screen
          name="detail"
          options={{
            title: '상세',
            headerStyle: { backgroundColor: COLORS.bg },
            headerShadowVisible: false,
            headerTitleStyle: { ...TYPO.subtitle, color: COLORS.text },
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
