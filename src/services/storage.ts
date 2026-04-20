import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dish } from "../types";

const DISHES_KEY = "dishes";

export async function saveDishes(dishes: Dish[]): Promise<void> {
  await AsyncStorage.setItem(DISHES_KEY, JSON.stringify(dishes));
}

export async function loadDishes(): Promise<Dish[]> {
  const raw = await AsyncStorage.getItem(DISHES_KEY);
  if (!raw) return [];
  return JSON.parse(raw) as Dish[];
}
