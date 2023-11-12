"use client";

import { Group, Paper, Select, Text } from "@mantine/core";
import React from "react";

import { useDashboardStore } from "@/store";

const Header = (): React.JSX.Element => {
  const setfilteredText = useDashboardStore((state) => state.setFilterText);
  const filterText = useDashboardStore((state) => state.filterText);
  return (
    <Paper shadow="sm" p="sm">
      <Group justify="space-between">
        <Text size="xl" fw="bold">
          Dashboards
        </Text>
        <Select
          data-testid="filter-type"
          placeholder="Select type"
          data={[
            { value: "ALL", label: "All types" },
            { value: "VISUALIZATION", label: "Visualization" },
            { value: "MAP", label: "Map" },
            { value: "TEXT", label: "Text" },
          ]}
          defaultValue={filterText}
          value={filterText}
          variant="default"
          checkIconPosition="right"
          leftSection={<span>Filter items:</span>}
          leftSectionWidth={100}
          // The value from onChange is string | null but setFiltered expects type FilterType = "VISUALIZATION" | "MAP" | "TEXT" | "MESSAGES" | "ALL";
          //@ts-ignore
          onChange={(value) => setfilteredText(value)}
        />
      </Group>
    </Paper>
  );
};

export default Header;
