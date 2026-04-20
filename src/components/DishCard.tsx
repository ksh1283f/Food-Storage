import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dish } from "../types";
import { calcDDay, formatDDay, getDDayStatus } from "../utils/date";

type Props = {
  dish: Dish;
  onPress: () => void;
};

const STATUS_COLORS: Record<string, string> = {
  expired: "#ef4444",
  today: "#f97316",
  soon: "#eab308",
  safe: "#22c55e",
};

export default function DishCard({ dish, onPress }: Props) {
  const dDay = calcDDay(dish.expireAt);
  const status = getDDayStatus(dDay);
  const color = STATUS_COLORS[status];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={[styles.dday, { color }]}>{formatDDay(dDay)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e5e7eb",
  },
  name: {
    fontSize: 16,
  },
  dday: {
    fontSize: 14,
    fontWeight: "600",
  },
});
