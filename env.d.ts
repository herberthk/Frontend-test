declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DASHBOARDS_URL: string;
      DASHBOARD_ITEM_URL: string;
    }
  }
}

export {}
