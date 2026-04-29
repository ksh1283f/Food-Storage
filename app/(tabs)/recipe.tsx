import PrimaryButton from "@/src/components/ui/PrimaryButton";
import { useRecipeStore } from "@/src/store/useRecipeStore";
import { RecipeMatch } from "@/src/types/recipe";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function RecipeScreen() {
  const { recipes, fetchRecipes } = useRecipeStore();

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);


  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>추천 요리</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.recipe.id}
        renderItem={({ item }) => <RecipeCard item={item} />}
      />
      <PrimaryButton title="+ 반찬 추가" onPress={handleAdd} />
    </View>
  );
}

function handleAdd(){
  console.log("test");
}

type RecipeCardProps = {
  item: RecipeMatch;
};

function RecipeCard({ item }: RecipeCardProps) {
  const { recipe, matched, missing, score } = item;

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{recipe.name}</Text>

      <Text style={styles.score}>완성도: {Math.round(score * 100)}%</Text>
      <Text style={styles.section}>보유 재료</Text>
      <Text>{matched.join(", ")}</Text>

      {missing.length > 0 && (
        <>
          <Text style={styles.missing}>부족 재료</Text>
          <Text>{missing.join(", ")}</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  score: {
    marginVertical: 6,
  },
  section: {
    marginTop: 8,
    fontWeight: "600",
  },
  missing: {
    marginTop: 8,
    color: "red",
  },
});
