import React, { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { COLORS, SPACING } from "@/src/theme/designSystem";

export default function Card({ children }: PropsWithChildren) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: SPACING.md,
    padding: SPACING.md,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
});
