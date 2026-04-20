import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, TYPO } from "@/src/theme/designSystem";

type Props = {
  title: string;
  onPress: () => void;
};

export default function PrimaryButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  text: {
    color: "#FFFFFF",
    ...TYPO.subtitle,
  },
});
