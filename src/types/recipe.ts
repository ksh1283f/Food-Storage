export type Recipe = {
    id: string;
    name: string;
    ingredients: string[];
    optionalIngredients?: string[];
    image?: string;
};

export type RecipeMatch = {
    recipe: Recipe;
    matched: string[];
    missing: string[];
    score: number;
};