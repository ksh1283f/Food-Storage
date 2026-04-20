import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDishStore } from "../store/useDishStore";
import { calcDDay, formatDDay, getDDayStatus } from "../utils/date";

const STATUS_COLORS: Record<string, string> = {
  expired: "#ef4444",
  today: "#f97316",
  soon: "#eab308",
  safe: "#22c55e",
};

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dishes = useDishStore((s) => s.dishes);
  const updateDish = useDishStore((s) => s.updateDish);

  const dish = dishes.find((d) => d.id === id);

  if (!dish) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>반찬을 찾을 수 없어요</Text>
      </View>
    );
  }

  const dDay = calcDDay(dish.expireAt);
  const status = getDDayStatus(dDay);
  const ddayColor = STATUS_COLORS[status];

  async function handleAction(action: "eaten" | "discarded") {
    const label = action === "eaten" ? "먹었어요" : "버렸어요";
    Alert.alert(label, `"${dish!.name}"을(를) ${label}?`, [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        onPress: async () => {
          await updateDish(id, { status: action });
          router.back();
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={[styles.dday, { color: ddayColor }]}>{formatDDay(dDay)}</Text>

      <View style={styles.infoBox}>
        <Row label="카테고리" value={dish.category} />
        <Row label="보관" value={dish.storageType === "fridge" ? "냉장" : "냉동"} />
        <Row label="권장 보관일" value={`${dish.recommendedDays}일`} />
        <Row label="만료일" value={dish.expireAt.slice(0, 10)} />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.btn, styles.btnEaten]}
          onPress={() => handleAction("eaten")}
        >
          <Text style={styles.btnText}>먹었어요</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnDiscarded]}
          onPress={() => handleAction("discarded")}
        >
          <Text style={styles.btnText}>버렸어요</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  container: { flex: 1, backgroundColor: "#fff", padding: 24 },
  notFound: { textAlign: "center", marginTop: 60, color: "#9ca3af" },
  name: { fontSize: 26, fontWeight: "700", marginBottom: 6 },
  dday: { fontSize: 20, fontWeight: "600", marginBottom: 28 },
  infoBox: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 16,
    marginBottom: 36,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
  },
  rowLabel: { color: "#6b7280", fontSize: 14 },
  rowValue: { fontSize: 14, fontWeight: "500" },
  actions: { flexDirection: "row", gap: 12 },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  btnEaten: { backgroundColor: "#22c55e" },
  btnDiscarded: { backgroundColor: "#ef4444" },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
