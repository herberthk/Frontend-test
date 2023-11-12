import { Container, Flex, Skeleton } from "@mantine/core";
import React from "react";

const Loading = (): React.JSX.Element => {
  return (
    <Container>
      <Skeleton mt="sm" h={100} width="100%" />
      <Flex mt="md" direction="column" gap="xs">
        <Skeleton h={130} width="100%" />
        <Skeleton h={130} width="100%" />
        <Skeleton h={130} width="100%" />
        <Skeleton h={130} width="100%" />
      </Flex>
    </Container>
  );
};

export default Loading;
