import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import * as Haptics from "expo-haptics";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDishStore } from "../store/useDishStore";
import { calcDDay } from "../utils/date";
import { COLORS, SPACING, TYPO } from "@/src/theme/designSystem";
import Card from "@/src/components/ui/Card";
import PrimaryButton from "@/src/components/ui/PrimaryButton";
import StatusBadge from "@/src/components/ui/StatusBadge";

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{dish.name}</Text>
        <View style={styles.badgeWrap}>
          <StatusBadge dday={dDay} />
        </View>

        <Card>
          <Row label="카테고리" value={dish.category} />
          <Row label="보관" value={dish.storageType === "fridge" ? "냉장" : "냉동"} />
          <Row label="권장 보관일" value={`${dish.recommendedDays}일`} />
          <Row label="만료일" value={dish.expireAt.slice(0, 10)} />
        </Card>
      </View>

      <View style={styles.actions}>
        <PrimaryButton title="먹었어요" onPress={() => handleAction("eaten")} />
        <TouchableOpacity
          style={styles.discardBtn}
          onPress={() => handleAction("discarded")}
          activeOpacity={0.7}
        >
          <Text style={styles.discardText}>버렸어요</Text>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { flex: 1, padding: SPACING.md },
  notFound: { textAlign: "center", marginTop: 60, color: COLORS.subText },
  name: { ...TYPO.title, color: COLORS.text, marginBottom: SPACING.sm },
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
});
