import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import type { Dashboard, DashboardState, FilterType } from "@/types";

export const useDashboardStore = create<DashboardState>()(
  devtools(
    persist(
      (set) => ({
        // initial state
        dashboards: [],
        filterText: "ALL",
        // methods for manipulating state
        setDashBoards: (dashboards: Dashboard[]) => {
          set(() => ({
            dashboards,
          }));
        },
        // Star the dashboard
        starDashboard: (id: string) => {
          set((state) => ({
            dashboards: state.dashboards.map((d) =>
              d.id === id
                ? {
                  ...d,
                  starred: !d.starred,
                }
                : { ...d },
            ),
          }));
        },
        setFilterText: (filterText: FilterType) => {
          set(() => ({
            filterText,
          }));
        },
      }),
      {
        name: "Dashboard-information",
        // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      },
    ),
  ),
);
