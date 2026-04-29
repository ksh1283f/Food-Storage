import { StyleSheet, TextInput, TextInputProps } from "react-native";
import { COLORS, SPACING, TYPO } from "@/src/theme/designSystem";

type Props = TextInputProps & {
  error?: boolean;
};

export default function AuthInput({ error, style, ...props }: Props) {
  return (
    <TextInput
      style={[styles.input, error && styles.inputError, style]}
      placeholderTextColor={COLORS.neutral}
      autoCapitalize="none"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: "#E3E5E8",
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    ...TYPO.body,
    color: COLORS.text,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
});
