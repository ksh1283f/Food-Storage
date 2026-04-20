import { create } from "zustand";
import { Dish } from "../types";
import { loadDishes, saveDishes } from "../services/storage";

type DishStore = {
  dishes: Dish[];
  load: () => Promise<void>;
  addDish: (dish: Dish) => Promise<void>;
  updateDish: (id: string, patch: Partial<Dish>) => Promise<void>;
};

export const useDishStore = create<DishStore>((set, get) => ({
  dishes: [],

  load: async () => {
    const dishes = await loadDishes();
    set({ dishes });
  },

  addDish: async (dish) => {
    const dishes = [...get().dishes, dish];
    set({ dishes });
    await saveDishes(dishes);
  },

  updateDish: async (id, patch) => {
    const dishes = get().dishes.map((d) => (d.id === id ? { ...d, ...patch } : d));
    set({ dishes });
    await saveDishes(dishes);
  },
}));
