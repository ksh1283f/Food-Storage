import { Stack } from "expo-router";
import { COLORS, TYPO } from "@/src/theme/designSystem";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="signup"
        options={{
          title: "회원가입",
          headerStyle: { backgroundColor: COLORS.bg },
          headerShadowVisible: false,
          headerTitleStyle: { ...TYPO.subtitle, color: COLORS.text },
        }}
      />
    </Stack>
  );
}
