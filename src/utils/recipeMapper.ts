import { v4 as uuidv4 } from "uuid";
import { Recipe, RecipeListResponse, RecipeResponse } from "../types";

export function mapRecipe(raw: RecipeResponse): Recipe {
  return {
    id: uuidv4(),
    name: raw.name,
    description: raw.description,
    ingredients: raw.ingredients,
    missingIngredients: raw.missingIngredients,
    steps: raw.steps,
    score: raw.score,
  };
}

export function mapRecipeList(response: RecipeListResponse): Recipe[] {
  return response.recipes.map(mapRecipe);
}
