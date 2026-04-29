export async function fetchAIRecipes(ingredients: string[]){
    const res = await fetch("https://food-storage-back.onrender.com/recipes/ai-recommend", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            ingredients,
            expiringIngredients: [],
            preferences: { difficulty: "ease" },
        }),
    });

    return res.json();
}