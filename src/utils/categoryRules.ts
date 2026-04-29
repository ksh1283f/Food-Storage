import { DishCategory, StorageType } from "../types";

export const CATEGORY_RULES: Record<DishCategory, Record<StorageType, number>> = {
  나물: { fridge: 3, freezer: 14 },
  볶음: { fridge: 5, freezer: 14 },
  조림: { fridge: 7, freezer: 30 },
  김치: { fridge: 14, freezer: 60 },
  국: { fridge: 3, freezer: 14 },
  테스트: {fridge:1, freezer: 1},
};

export const CATEGORIES: DishCategory[] = ["나물", "볶음", "조림", "김치", "국"];

export function getRecommendedDays(category: DishCategory, storageType: StorageType): number {
  return CATEGORY_RULES[category][storageType];
}
