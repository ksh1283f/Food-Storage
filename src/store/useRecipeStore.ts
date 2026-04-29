import { create } from "zustand";
import { fetchAIRecipes } from "../api/aiRecipeApi";
import { Recipe } from "../types";
import { useDishStore } from "./useDishStore";

type RecipeState = {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
  fetchRecipes: () => Promise<void>;
};

export const useRecipeStore = create<RecipeState>((set) => ({
  recipes: [],
  loading: false,
  error: null,

  fetchRecipes: async () => {
    set({ loading: true, error: null });
    try {
      const dishes = useDishStore.getState().dishes.filter((d) => d.status === "active");
      const ingredients = dishes.map((d) => d.name);
      const result = await fetchAIRecipes(ingredients);
      set({ recipes: result, loading: false });
    } catch (e: any) {
      set({ error: e.message ?? "레시피를 불러오지 못했어요.", loading: false });
    }
  },
}));
