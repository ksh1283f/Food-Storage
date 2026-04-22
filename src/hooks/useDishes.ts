import { useMemo } from "react";
import { useDishStore } from "../store/useDishStore";
import { calcDDay } from "../utils/date";

export function useDishes() {
  const dishes = useDishStore((s) => s.dishes);

  const activeSorted = useMemo(
    () =>
      dishes
        .filter((d) => d.status === "active")
        .sort((a, b) => a.expireAt.localeCompare(b.expireAt)),
    [dishes]
  );

  const dueTodayCount = useMemo(
    () => activeSorted.filter((d) => calcDDay(d.expireAt) <= 0).length,
    [activeSorted]
  );

  return { activeSorted, dueTodayCount };
}
