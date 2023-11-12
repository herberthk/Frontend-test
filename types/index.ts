type Access = {
  manage: boolean;
  externalize: boolean;
  write: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

export type VisualizationType =
  | "COLUMN"
  | "PIVOT_TABLE"
  | "YEAR_OVER_YEAR_LINE"
  | "LINE"
  | "PIE"
  | "STACKED_COLUMN"
  | "GAUGE";

type Visualization = {
  type: VisualizationType;
  id: string;
  name: string;
};

type Map = {
  id: string;
  name: string;
};

export type DashboardItem = {
  visualization?: Visualization;
  map?: Map;
  text?: string;
  users: [];
  shape: string;
  x: number;
  y: number;
  type: "VISUALIZATION" | "MAP" | "TEXT" | "MESSAGES";
  id: string;
  reports: [];
  resources: [];
  h: number;
  w: number;
};

export type DashboardDetails = {
  access: Access;
  restrictFilters: boolean;
  displayName: string;
  id: string;
  dashboardItems: DashboardItem[];
  starred: boolean;
};

export interface Dashboard {
  displayName: string;
  id: string;
  starred: boolean;
  details: DashboardDetails;
}

export type FilterType = "VISUALIZATION" | "MAP" | "TEXT" | "MESSAGES" | "ALL";
export interface DashboardState {
  dashboards: Dashboard[];
  filterText: FilterType;
  setFilterText: (value: FilterType) => void;
  setDashBoards: (dashboards: Dashboard[]) => void;
  starDashboard: (id: string) => void;
}
