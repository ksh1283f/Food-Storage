import Card from "@/src/components/ui/Card";
import { useRecipeStore } from "@/src/store/useRecipeStore";
import { COLORS, SPACING, TYPO } from "@/src/theme/designSystem";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipes = useRecipeStore((s) => s.recipes);
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>레시피를 찾을 수 없어요</Text>
      </SafeAreaView>
    );
  }

  const availableIngredients = recipe.ingredients.filter(
    (i) => !recipe.missingIngredients.includes(i)
  );

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.name}>{recipe.name}</Text>
        <Text style={styles.desc}>{recipe.description}</Text>

        <Card>
          <Text style={styles.sectionTitle}>보유 재료</Text>
          <Text style={styles.ingredientText}>{availableIngredients.join(", ")}</Text>

          {recipe.missingIngredients.length > 0 && (
            <>
              <Text style={[styles.sectionTitle, styles.missingTitle]}>부족한 재료</Text>
              <Text style={styles.missingText}>{recipe.missingIngredients.join(", ")}</Text>
            </>
          )}
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>조리 순서</Text>
          {recipe.steps.map((step, index) => (
            <View key={index} style={styles.stepRow}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepNum}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: SPACING.md, paddingBottom: SPACING.xl },
  notFound: { textAlign: "center", marginTop: 60, color: COLORS.subText },
  name: { ...TYPO.title, color: COLORS.text, marginBottom: SPACING.sm },
  desc: { ...TYPO.body, color: COLORS.subText, marginBottom: SPACING.md, lineHeight: 22 },
  sectionTitle: { ...TYPO.subtitle, color: COLORS.text, marginBottom: SPACING.sm },
  missingTitle: { marginTop: SPACING.md, color: COLORS.danger },
  ingredientText: { ...TYPO.body, color: COLORS.text, lineHeight: 22 },
  missingText: { ...TYPO.body, color: COLORS.danger },
  stepRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: SPACING.md },
  stepBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.sm,
    marginTop: 1,
  },
  stepNum: { color: "#fff", fontSize: 12, fontWeight: "700" },
  stepText: { ...TYPO.body, color: COLORS.text, flex: 1, lineHeight: 22 },
});
