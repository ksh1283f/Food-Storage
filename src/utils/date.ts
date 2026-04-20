import { DDayStatus } from "../types";

export function calcExpireAt(createdAt: string, days: number): string {
  const date = new Date(createdAt);
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

export function calcDDay(expireAt: string): number {
  const now = new Date();
  const expire = new Date(expireAt);
  const diffMs = expire.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0);
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export function getDDayStatus(dDay: number): DDayStatus {
  if (dDay < 0) return "expired";
  if (dDay === 0) return "today";
  if (dDay <= 2) return "soon";
  return "safe";
}

export function formatDDay(dDay: number): string {
  if (dDay < 0) return `D+${Math.abs(dDay)}`;
  if (dDay === 0) return "D-Day";
  return `D-${dDay}`;
}
