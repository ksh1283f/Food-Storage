import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
import { useDishStore } from "../store/useDishStore";
import { DishCategory, StorageType } from "../types";
import { CATEGORIES, getRecommendedDays } from "../utils/categoryRules";
import { calcExpireAt } from "../utils/date";

export default function AddScreen() {
  const router = useRouter();
  const addDish = useDishStore((s) => s.addDish);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<DishCategory>("나물");
  const [storageType, setStorageType] = useState<StorageType>("fridge");

  async function handleSubmit() {
    const trimmed = name.trim();
    if (!trimmed) {
      Alert.alert("이름을 입력해주세요");
      return;
    }

    const createdAt = new Date().toISOString();
    const recommendedDays = getRecommendedDays(category, storageType);
    const expireAt = calcExpireAt(createdAt, recommendedDays);

    await addDish({
      id: uuidv4(),
      name: trimmed,
      category,
      storageType,
      createdAt,
      expireAt,
      recommendedDays,
      status: "active",
    });

    router.back();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>반찬 이름</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="예: 시금치 나물"
        autoFocus
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />

      <Text style={styles.label}>카테고리</Text>
      <View style={styles.row}>
        {CATEGORIES.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.chip, category === c && styles.chipActive]}
            onPress={() => setCategory(c)}
          >
            <Text style={[styles.chipText, category === c && styles.chipTextActive]}>
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>보관 방법</Text>
      <View style={styles.row}>
        {(["fridge", "freezer"] as StorageType[]).map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.chip, storageType === s && styles.chipActive]}
            onPress={() => setStorageType(s)}
          >
            <Text style={[styles.chipText, storageType === s && styles.chipTextActive]}>
              {s === "fridge" ? "냉장" : "냉동"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
        <Text style={styles.submitText}>저장</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  label: { fontSize: 13, color: "#6b7280", marginBottom: 8, marginTop: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  chipActive: { backgroundColor: "#3b82f6", borderColor: "#3b82f6" },
  chipText: { fontSize: 14, color: "#374151" },
  chipTextActive: { color: "#fff" },
  submit: {
    marginTop: 36,
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
