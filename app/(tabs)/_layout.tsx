import { COLORS, TYPO } from "@/src/theme/designSystem";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

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
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="nutrition-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recipe"
        options={{
          title: "추천 요리",
          tabBarLabel: "레시피",
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
