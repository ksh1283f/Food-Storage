import { Recipe, RecipeMatch } from "../types/recipe";


const recipeDB: Recipe[] = [
    {
        id: "1",
        name: "김치볶음밥",
        ingredients: ["김치", "밥"],
        optionalIngredients: ["계란", "대파", "햄"],
    },
    {
        id: "2",
        name: "계란말이",
        ingredients: [ "계란"],
        optionalIngredients: ["당근", "대파"],
    },
    {
        id: "3",
        name: "김치찌개",
        ingredients: [ "김치", "두부"],
        optionalIngredients: ["돼지고기", "대파"],
    },
];

export async function getRecommendedRecipes(
    userIngredients: string[]
): Promise<RecipeMatch[]> {
    return recipeDB
        .map((recipe) => {
            const matched = recipe.ingredients.filter((i) =>
                userIngredients.includes(i)
            );
            const missing = recipe.ingredients.filter(
                (i) => !userIngredients.includes(i)
            );

            const score = matched.length / recipe.ingredients.length;

            return {
                recipe,
                matched,
                missing,
                score,
            };
        })
        .filter((r) => r.score >= 0.5)  // minimum
        .sort((a,b) => b.score - a.score);

}
