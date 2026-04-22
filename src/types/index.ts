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
