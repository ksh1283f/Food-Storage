import Card from "@/src/components/ui/Card";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import { useRecipeStore } from "@/src/store/useRecipeStore";
import { COLORS, SPACING, TYPO } from "@/src/theme/designSystem";
import { Recipe } from "@/src/types";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RecipeScreen() {
  const router = useRouter();
  const { recipes, loading, error, fetchRecipes } = useRecipeStore();

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>AI가 레시피를 추천 중이에요...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <PrimaryButton title="다시 시도" onPress={fetchRecipes} style={styles.retryBtn} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onPress={() => router.push(`/recipe/${item.id}`)} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>냉장고 재료를 기반으로{"\n"}레시피를 추천받아보세요</Text>
        }
        ListFooterComponent={
          recipes.length > 0 ? (
            <PrimaryButton title="다시 추천받기" onPress={fetchRecipes} style={styles.refreshBtn} />
          ) : null
        }
      />
      {recipes.length === 0 && (
        <View style={styles.btnWrap}>
          <PrimaryButton title="레시피 추천받기" onPress={fetchRecipes} />
        </View>
      )}
    </SafeAreaView>
  );
}

function RecipeCard({ recipe, onPress }: { recipe: Recipe; onPress: () => void }) {
  const availableCount = recipe.ingredients.length - recipe.missingIngredients.length;
  const totalCount = recipe.ingredients.length;
  const pct = totalCount > 0 ? Math.round((availableCount / totalCount) * 100) : 0;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card>
        <View style={styles.row}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
          <Text style={[styles.score, { color: pct >= 70 ? COLORS.success : COLORS.warning }]}>
            {pct}%
          </Text>
        </View>
        <Text style={styles.desc} numberOfLines={2}>{recipe.description}</Text>
        {recipe.missingIngredients.length > 0 && (
          <Text style={styles.missing}>
            부족한 재료: {recipe.missingIngredients.join(", ")}
          </Text>
        )}
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  list: { padding: SPACING.md, paddingBottom: SPACING.lg },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: SPACING.lg },
  loadingText: { ...TYPO.body, color: COLORS.subText, marginTop: SPACING.md },
  errorText: { ...TYPO.body, color: COLORS.danger, marginBottom: SPACING.md, textAlign: "center" },
  retryBtn: { width: 160 },
  empty: { ...TYPO.body, color: COLORS.subText, textAlign: "center", marginTop: 80, lineHeight: 24 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: SPACING.xs },
  recipeName: { ...TYPO.subtitle, color: COLORS.text, flex: 1 },
  score: { ...TYPO.subtitle, marginLeft: SPACING.sm },
  desc: { ...TYPO.body, color: COLORS.subText, marginBottom: SPACING.sm },
  missing: { ...TYPO.caption, color: COLORS.danger },
  refreshBtn: { marginTop: SPACING.md },
  btnWrap: { padding: SPACING.md },
});
