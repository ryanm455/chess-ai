import { Flex, Heading, Icon, useColorMode, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BarChart2, Play } from "react-feather";

export default function Navbar() {
  const { colorMode } = useColorMode();
  return (
    <Flex
      justifyContent="space-between"
      p="10px 20px"
      zIndex={100}
      position="sticky"
      top={0}
      borderBottomColor={colorMode === "light" ? "gray.100" : "gray.700"}
      borderBottomWidth="1px"
      backgroundColor={colorMode === "light" ? "#FFF" : "#1A202C"}
      transition="all 0.2s"
    >
      <div>
        <Link href="/">
          <Heading color="blue.600" cursor="pointer">
            chess.ai
          </Heading>
        </Link>
      </div>
      <Flex gridGap="10px">
        <Link href="/stats">
          <IconButton
            aria-label="Stats"
            variant="ghost"
            color="gray.500"
            icon={<Icon as={BarChart2} />}
          />
        </Link>
        <Link href="/play">
          <IconButton
            aria-label="Play"
            variant="ghost"
            color="gray.500"
            icon={<Icon as={Play} />}
          />
        </Link>
      </Flex>
    </Flex>
  );
}
