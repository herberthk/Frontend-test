import { Box, Container } from "@mantine/core";
import React from "react";

import Collapsible from "@/components/accordion/accordion";
import Header from "@/components/header/Header";
import type { Dashboard, DashboardDetails } from "@/types";

type Response = {
  dashboards: Dashboard[];
};

const getDashboard = async (id: string): Promise<DashboardDetails> => {
  const serverUrl = process.env.DASHBOARD_ITEM_URL;
  const url = `${serverUrl}/${id}.json`;
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600, // revalidate at most every hour,
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const dashboard = await res.json();
    return dashboard;
  } catch (error) {
    //@ts-ignore
    return error.statusText;
  }
};

const getDashboards = async (): Promise<Response> => {
  const url = process.env.DASHBOARDS_URL;
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 3600, // revalidate at most every hour,
      },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const dashboards = await res.json();
    return dashboards;
  } catch (error) {
    //@ts-ignore
    return error.statusText;
  }
};

const Home = async (): Promise<React.JSX.Element> => {
  const res = await getDashboards();
  const { dashboards } = res;
  const dashBoardsWithDetails: Dashboard[] = await Promise.all(
    dashboards.map(async (dashboard) => {
      return {
        displayName: dashboard.displayName,
        id: dashboard.id,
        starred: dashboard.starred,
        details: await getDashboard(dashboard.id),
      };
    }),
  );
  // dashBoardsWithDetails.filter()
  // console.log(dashBoardsWithDetails);

  return (
    <Container>
      <Header />
      <Box mt="md" mb="xl" data-testid="container">
        <Collapsible dashboards={dashBoardsWithDetails} />
      </Box>
    </Container>
  );
};

export default Home;
