import { api } from "@/src/lib/api";
import { RecipeListResponse } from "@/src/types";
import { mapRecipeList } from "@/src/utils/recipeMapper";

export async function fetchAIRecipes(ingredients: string[]) {
  const data = await api.post<RecipeListResponse>("/recipes/ai-recommend", {
    ingredients,
    expiringIngredients: [],
    preferences: { difficulty: "ease" },
  });

  return mapRecipeList(data);
}
