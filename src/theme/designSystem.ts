export const COLORS = {
  bg: "#F7F8FA",
  card: "#FFFFFF",
  primary: "#FF9500",
  text: "#111111",
  subText: "#666666",
  success: "#34C759",
  warning: "#FF9500",
  danger: "#FF3B30",
  neutral: "#999999",
};

export const TYPO = {
  title: { fontSize: 22, fontWeight: "700" as const },
  subtitle: { fontSize: 16, fontWeight: "600" as const },
  body: { fontSize: 14 },
  caption: { fontSize: 12, color: "#888888" },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export function getStatusColor(dday: number): string {
  if (dday < 0) return COLORS.neutral;
  if (dday === 0) return COLORS.danger;
  if (dday <= 2) return COLORS.warning;
  return COLORS.success;
}
