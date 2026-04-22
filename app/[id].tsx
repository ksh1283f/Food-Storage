import * as Haptics from "expo-haptics";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ReactNode, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "@/src/components/ui/Card";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import StatusBadge from "@/src/components/ui/StatusBadge";
import { useDishStore } from "@/src/store/useDishStore";
import { COLORS, SPACING, TYPO } from "@/src/theme/designSystem";
import { CATEGORIES, getRecommendedDays } from "@/src/utils/categoryRules";
import { calcDDay, calcExpireAt } from "@/src/utils/date";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dishes = useDishStore((s) => s.dishes);
  const updateDish = useDishStore((s) => s.updateDish);

  const dish = dishes.find((d) => d.id === id);

  if (!dish) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>반찬을 찾을 수 없어요</Text>
      </SafeAreaView>
    );
  }

  const dDay = calcDDay(dish.expireAt);

  async function handleAction(action: "eaten" | "discarded") {
    const label = action === "eaten" ? "먹었어요" : "버렸어요";
    Alert.alert(label, `"${dish!.name}"을(를) ${label}?`, [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        onPress: async () => {
          await updateDish(id, { status: action });
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          router.back();
        },
      },
    ]);
  }

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(dish.name);
  const [category, setCategory] = useState(dish.category);
  const [storageType, setStorageType] = useState(dish.storageType);

  const editedRecommendedDays = getRecommendedDays(category, storageType);
  const editedExpireAt = calcExpireAt(dish.createdAt, editedRecommendedDays);

  async function handleSave() {
    await updateDish(id, {
      name,
      category,
      storageType,
      recommendedDays: editedRecommendedDays,
      expireAt: editedExpireAt,
    });
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsEditing(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      {!isEditing && (
        <TouchableOpacity style={styles.editBtn} onPress={() => setIsEditing(true)}>
          <Text style={styles.editBtnText}>편집</Text>
        </TouchableOpacity>
      )}

      <View style={styles.content}>
        {isEditing ? (
          <TextInput value={name} onChangeText={setName} style={styles.nameInput} />
        ) : (
          <Text style={styles.name}>{dish.name}</Text>
        )}

        <View style={styles.badgeWrap}>
          <StatusBadge dday={dDay} />
        </View>

        <Card>
          {isEditing ? (
            <>
              <EditRow label="카테고리">
                <View style={styles.chipWrap}>
                  {CATEGORIES.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={[styles.chip, category === item && styles.chipActive]}
                      onPress={() => setCategory(item)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.chipText, category === item && styles.chipTextActive]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </EditRow>
              <EditRow label="보관">
                <View style={styles.chipWrap}>
                  {(["fridge", "freezer"] as const).map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={[styles.chip, storageType === item && styles.chipActive]}
                      onPress={() => setStorageType(item)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.chipText, storageType === item && styles.chipTextActive]}>
                        {item === "fridge" ? "냉장" : "냉동"}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </EditRow>
            </>
          ) : (
            <>
              <Row label="카테고리" value={dish.category} />
              <Row label="보관" value={dish.storageType === "fridge" ? "냉장" : "냉동"} />
            </>
          )}
          <Row
            label="권장 보관일"
            value={`${isEditing ? editedRecommendedDays : dish.recommendedDays}일`}
          />
          <Row
            label="만료일"
            value={(isEditing ? editedExpireAt : dish.expireAt).slice(0, 10)}
          />
        </Card>
      </View>

      <View style={styles.actions}>
        {isEditing ? (
          <>
            <PrimaryButton title="저장" onPress={handleSave} />
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setIsEditing(false)}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <PrimaryButton title="먹었어요" onPress={() => handleAction("eaten")} />
            <TouchableOpacity
              style={styles.discardBtn}
              onPress={() => handleAction("discarded")}
              activeOpacity={0.7}
            >
              <Text style={styles.discardText}>버렸어요</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

function EditRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View style={styles.editRow}>
      <Text style={styles.rowLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { flex: 1, padding: SPACING.md },
  notFound: { textAlign: "center", marginTop: 60, color: COLORS.subText },
  editBtn: { position: "absolute", top: 10, right: 20, zIndex: 1 },
  editBtnText: { color: COLORS.primary },
  name: { ...TYPO.title, color: COLORS.text, marginBottom: SPACING.sm },
  nameInput: {
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 12,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: "#E3E5E8",
    ...TYPO.title,
    color: COLORS.text,
  },
  badgeWrap: { alignSelf: "flex-start", marginBottom: SPACING.md },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SPACING.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E3E5E8",
  },
  rowLabel: { ...TYPO.body, color: COLORS.subText },
  rowValue: { ...TYPO.body, color: COLORS.text, fontWeight: "500" },
  editRow: {
    paddingVertical: SPACING.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E3E5E8",
    gap: SPACING.sm,
  },
  chipWrap: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.sm },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E3E5E8",
    backgroundColor: COLORS.card,
  },
  chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { ...TYPO.body, color: COLORS.subText },
  chipTextActive: { color: "#fff" },
  actions: { padding: SPACING.md, paddingTop: SPACING.sm, gap: SPACING.sm },
  discardBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  discardText: { ...TYPO.subtitle, color: COLORS.danger },
  cancelBtn: { paddingVertical: 14, borderRadius: 12, alignItems: "center", backgroundColor: "#eee" },
  cancelText: { color: "#333" },
});
