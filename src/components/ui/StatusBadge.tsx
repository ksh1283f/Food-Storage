import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getStatusColor, TYPO } from "@/src/theme/designSystem";
import { formatDDay } from "@/src/utils/date";

type Props = {
  dday: number;
};

export default function StatusBadge({ dday }: Props) {
  const color = getStatusColor(dday);

  return (
    <View style={[styles.badge, { backgroundColor: `${color}20` }]}>
      <Text style={[styles.text, { color }]}>{formatDDay(dday)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  text: {
    ...TYPO.body,
    fontWeight: "600",
  },
});
