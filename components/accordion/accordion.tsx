"use client";

import { Accordion, ActionIcon, Flex, Group, Text } from "@mantine/core";
import type { FC } from "react";
import React, { useEffect } from "react";
import {
  AiFillStar,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStar,
} from "react-icons/ai";
import { BsFillPieChartFill, BsGraphUpArrow } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaTachographDigital } from "react-icons/fa6";
import { SlGraph } from "react-icons/sl";
import { VscGraph } from "react-icons/vsc";

import { useDashboardStore } from "@/store";
import type { Dashboard } from "@/types";
import { filterDeepNestedArray } from "@/utils";

import classes from "./accordion.module.scss";

const VISUALIZATION_ICONS = {
  COLUMN: AiOutlineBarChart,
  PIVOT_TABLE: AiOutlineAreaChart,
  YEAR_OVER_YEAR_LINE: BsGraphUpArrow,
  LINE: SlGraph,
  PIE: BsFillPieChartFill,
  STACKED_COLUMN: VscGraph,
  GAUGE: FaTachographDigital,
};

interface AccordionLabelProps {
  displayName: string;
  starred: boolean;
  id: string;
}

const AccordionLabel: FC<AccordionLabelProps> = ({
  displayName,
  starred,
  id,
}) => {
  const starDashboard = useDashboardStore((state) => state.starDashboard);
  return (
    <Group mr="md" wrap="nowrap" justify="space-between">
      <Text size="md" fw="bold">
        {displayName}
      </Text>
      <ActionIcon
        size="sm"
        style={{ border: 0 }}
        variant="default"
        aria-label="Star"
        onClick={() => starDashboard(id)}
        data-testid="star-button"
      >
        {starred ? (
          <AiFillStar data-testid="stared" />
        ) : (
          <AiOutlineStar data-testid="un-stared" />
        )}
      </ActionIcon>
    </Group>
  );
};

type Props = {
  dashboards: Dashboard[];
};

const Collapsible: FC<Props> = ({ dashboards }): React.JSX.Element => {
  const setDashboardStore = useDashboardStore((state) => state.setDashBoards);
  const dashboardsWithDetails = useDashboardStore((state) => state.dashboards);
  useEffect(() => {
    // Lets update the store in case it is empty
    if (!dashboardsWithDetails.length) {
      setDashboardStore(dashboards);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // We get first dashboard such that we open it by default
  const firstItem = dashboardsWithDetails[0]?.displayName;
  const filterText = useDashboardStore((state) => state.filterText);
  const filtered = filterDeepNestedArray(
    dashboardsWithDetails,
    (item) => item.type === filterText,
  );
  const visibleDashbords: Dashboard[] =
    !filterText || filterText === "ALL" ? dashboardsWithDetails : filtered;

  // console.log("FilterText", filterText);
  // console.log("filtered", filtered);

  return (
    <Accordion role="list" defaultValue={firstItem} classNames={classes}>
      {visibleDashbords.map((item) => {
        // Filter out dashboards with type "MESSAGES" because they have no text.display
        const filteredDashboards = item.details.dashboardItems.filter(
          (d) => d.type !== "MESSAGES",
        );
        return (
          <Accordion.Item
            role="listitem"
            key={item.id}
            value={item.displayName}
          >
            <Accordion.Control>
              <AccordionLabel {...item} />
            </Accordion.Control>
            <Accordion.Panel role="contentinfo">
              <Flex direction="column" gap="sm">
                {filteredDashboards.map((d) => {
                  let dashboardItem = null;
                  // Display Items with visualization type
                  if (d.type === "VISUALIZATION") {
                    // Since visualization?.type can be undefined typescript is not happy so i've ignored it
                    // @ts-ignore
                    const Icon = VISUALIZATION_ICONS[d?.visualization?.type];

                    dashboardItem = (
                      <Group key={d.id}>
                        <Icon />
                        <Text size="sm">{d.visualization?.name}</Text>
                      </Group>
                    );
                  }
                  // Display Items with MAP type
                  if (d.type === "TEXT") {
                    dashboardItem = (
                      <Text
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        dangerouslySetInnerHTML={{ __html: d?.text! }}
                        size="sm"
                        key={d.id}
                      />
                    );
                  }

                  if (d.type === "MAP") {
                    dashboardItem = (
                      <Group key={d.id}>
                        <FaMapMarkerAlt />
                        <Text size="sm">{d.map?.name}</Text>
                      </Group>
                    );
                  }

                  return <>{dashboardItem}</>;
                })}
              </Flex>
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
};

export default Collapsible;
