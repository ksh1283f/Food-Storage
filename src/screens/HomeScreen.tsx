import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DishCard from "../components/DishCard";
import { useDishStore } from "../store/useDishStore";
import { Dish } from "../types";

export default function HomeScreen() {
  const router = useRouter();
  const dishes = useDishStore((s) => s.dishes);

  const activeSorted = useMemo(
    () =>
      dishes
        .filter((d) => d.status === "active")
        .sort((a, b) => a.expireAt.localeCompare(b.expireAt)),
    [dishes]
  );

  function handlePress(dish: Dish) {
    router.push({ pathname: "/detail", params: { id: dish.id } });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={activeSorted}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DishCard dish={item} onPress={() => handlePress(item)} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>등록된 반찬이 없어요</Text>
        }
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add")}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+ 추가</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  empty: {
    textAlign: "center",
    marginTop: 60,
    color: "#9ca3af",
    fontSize: 15,
  },
  fab: {
    position: "absolute",
    bottom: 28,
    right: 24,
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  fabText: { color: "#fff", fontWeight: "600", fontSize: 15 },
});
