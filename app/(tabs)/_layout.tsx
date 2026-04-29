import { Tabs } from "expo-router";
import { COLORS, TYPO } from "@/src/theme/designSystem";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.bg },
        headerShadowVisible: false,
        headerTitleStyle: { ...TYPO.subtitle, color: COLORS.text },
        tabBarActiveTintColor: COLORS.primary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "냉장고",
          tabBarLabel: "홈",
        }}
      />
      <Tabs.Screen
        name="recipe"
        options={{
          title: "추천 요리",
          tabBarLabel: "레시피",
        }}
      />
    </Tabs>
  );
}
