import { create } from "zustand";
import { fetchAIRecipes } from "../api/aiRecipeApi";
import { RecipeMatch } from "../types/recipe";
import { useDishStore } from "./useDishStore";

type RecipeState = {
    recipes: RecipeMatch[];
    loading: boolean;
    fetchRecipes: ()=> Promise<void>;    
}

export const useRecipeStore = create<RecipeState>((set) => ({
    recipes:[],
    loading: false,

    fetchRecipes: async () => {
        set({loading: true});

        const dishes = useDishStore.getState().dishes;
        const userIngredients = dishes.map((dish) => dish.name);
        // const result = await getRecommendedRecipes(userIngredients);
        const result = await fetchAIRecipes(userIngredients);

        set({
            recipes: result.recipes,
            loading: false,
        });
    },
}));


