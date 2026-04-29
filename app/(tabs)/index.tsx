import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DishCard from "@/src/components/dish/DishCard";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import { useDishes } from "@/src/hooks/useDishes";
import { COLORS, SPACING, TYPO } from "@/src/theme/designSystem";
import { Dish } from "@/src/types";

export default function HomeScreen() {
  const router = useRouter();
  const { activeSorted, dueTodayCount } = useDishes();

  function handlePress(dish: Dish) {
    router.push(`/${dish.id}`);
  }

  async function handleAdd() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push("/add");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🍱 냉장고</Text>
        <Text style={styles.summary}>오늘 먹어야 할 반찬 {dueTodayCount}개</Text>

        <FlatList
          contentContainerStyle={styles.listContent}
          data={activeSorted}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DishCard dish={item} onPress={() => handlePress(item)} />
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>아직 등록된 반찬이 없어요 🍱</Text>
          }
        />
      </View>
      <View style={styles.addButtonWrap}>
        <PrimaryButton title="+ 반찬 추가" onPress={handleAdd} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { flex: 1, paddingHorizontal: SPACING.md },
  title: { ...TYPO.title, color: COLORS.text, marginTop: SPACING.sm },
  summary: {
    ...TYPO.body,
    color: COLORS.subText,
    marginTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  listContent: { paddingBottom: SPACING.lg },
  empty: { textAlign: "center", marginTop: 100, color: COLORS.subText, ...TYPO.body },
  addButtonWrap: { padding: SPACING.md },
});
