export type StorageType = "fridge" | "freezer";

export type DishStatus = "active" | "eaten" | "discarded";

export type DishCategory = "나물" | "볶음" | "조림" | "김치" | "국" | "테스트";

export type Dish = {
  id: string;
  name: string;
  category: DishCategory;
  storageType: StorageType;
  createdAt: string;
  expireAt: string;
  recommendedDays: number;
  status: DishStatus;
};

export type DDayStatus = "expired" | "today" | "soon" | "safe";

// 백엔드 응답 원본 타입
export type RecipeResponse = {
  name: string;
  description: string;
  ingredients: string[];
  missingIngredients: string[];
  steps: string[];
  score: number;
};

export type RecipeListResponse = {
  recipes: RecipeResponse[];
};

// 화면 표시용 타입
export type Recipe = {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  missingIngredients: string[];
  steps: string[];
  score: number;
};
