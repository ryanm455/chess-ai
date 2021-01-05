import { Flex, Button, Heading, Icon, useColorMode } from "@chakra-ui/react";
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
          <Heading color="purple.500" cursor="pointer">
            chess.ai
          </Heading>
        </Link>
      </div>
      <Flex gridGap="10px">
        <Link href="/stats">
          <Button rightIcon={<Icon as={BarChart2} />} variant="outline">
            Stats
          </Button>
        </Link>
        <Link href="/play">
          <Button rightIcon={<Icon as={Play} />} variant="outline">
            Play
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
