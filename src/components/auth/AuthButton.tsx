import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { COLORS, TYPO } from "@/src/theme/designSystem";

type Props = TouchableOpacityProps & {
  title: string;
  loading?: boolean;
  variant?: "primary" | "ghost";
};

export default function AuthButton({ title, loading, variant = "primary", style, disabled, ...props }: Props) {
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity
      style={[styles.btn, isPrimary ? styles.primary : styles.ghost, (disabled || loading) && styles.disabled, style]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading
        ? <ActivityIndicator color={isPrimary ? "#fff" : COLORS.primary} />
        : <Text style={[styles.text, !isPrimary && styles.textGhost]}>{title}</Text>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  primary: { backgroundColor: COLORS.primary },
  ghost: { backgroundColor: "transparent" },
  disabled: { opacity: 0.5 },
  text: { ...TYPO.subtitle, color: "#fff" },
  textGhost: { color: COLORS.primary },
});
