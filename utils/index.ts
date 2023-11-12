import type { Dashboard, DashboardItem } from "@/types";

export const filterDeepNestedArray = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arr: any[],
  condition: (item: DashboardItem) => boolean,
): Dashboard[] => {
  return arr.reduce((acc, current) => {
    const filteredChildren = current?.details?.dashboardItems
      ? filterDeepNestedArray(current?.details?.dashboardItems, condition)
      : [];

    if (condition(current) || filteredChildren.length > 0) {
      acc.push({ ...current, details: { dashboardItems: filteredChildren } });
    }

    return acc;
  }, []);
};
