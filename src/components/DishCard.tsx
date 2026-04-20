import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dish } from "../types";
import { calcDDay } from "../utils/date";
import { COLORS, SPACING, TYPO } from "@/src/theme/designSystem";
import Card from "@/src/components/ui/Card";
import StatusBadge from "@/src/components/ui/StatusBadge";

type Props = {
  dish: Dish;
  onPress: () => void;
};

export default function DishCard({ dish, onPress }: Props) {
  const dDay = calcDDay(dish.expireAt);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card>
        <View style={styles.row}>
          <View>
            <Text style={styles.name}>{dish.name}</Text>
            <Text style={styles.meta}>{dish.category}</Text>
          </View>
          <StatusBadge dday={dDay} />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    ...TYPO.subtitle,
    color: COLORS.text,
  },
  meta: {
    ...TYPO.caption,
    color: COLORS.subText,
    marginTop: SPACING.xs,
  },
});
