import { useRouter } from "expo-router";
import React, { useState } from "react";
import * as Haptics from "expo-haptics";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuidv4 } from "uuid";
import { useDishStore } from "../store/useDishStore";
import { DishCategory, StorageType } from "../types";
import { CATEGORIES, getRecommendedDays } from "../utils/categoryRules";
import { calcExpireAt } from "../utils/date";
import { COLORS, SPACING, TYPO } from "@/src/theme/designSystem";
import PrimaryButton from "@/src/components/ui/PrimaryButton";

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

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.back();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>반찬 추가</Text>

        <Text style={styles.label}>반찬 이름</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="예: 시금치 나물"
          placeholderTextColor={COLORS.neutral}
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
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
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
              activeOpacity={0.7}
            >
              <Text style={[styles.chipText, storageType === s && styles.chipTextActive]}>
                {s === "fridge" ? "냉장" : "냉동"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.submitWrap}>
        <PrimaryButton title="저장" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { padding: SPACING.md },
  title: {
    ...TYPO.title,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  label: {
    ...TYPO.body,
    color: COLORS.subText,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E3E5E8",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    ...TYPO.subtitle,
    color: COLORS.text,
    backgroundColor: COLORS.card,
  },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3E5E8",
    backgroundColor: COLORS.card,
  },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { ...TYPO.body, color: COLORS.subText },
  chipTextActive: { color: "#fff" },
  submitWrap: { padding: SPACING.md, paddingTop: SPACING.sm },
});
