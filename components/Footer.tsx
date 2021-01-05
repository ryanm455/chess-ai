import {
  Box,
  Divider,
  Flex,
  Icon,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { HelpCircle, Sun, Moon } from "react-feather";
import css from "styled-jsx/css";

const { className, styles } = css.resolve`
  div {
    content-visibility: auto;
    contain-intrinsic-size: 0 71px;
  }
`;

export default function Footer() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box p="10px 0" className={className}>
      <Divider mb="10px" />
      <Flex>
        <Box w="50%" textAlign="center">
          <Link href="/about">
            <IconButton
              aria-label="About Page"
              variant="ghost"
              color="gray.500"
              icon={<Icon as={HelpCircle} />}
            />
          </Link>
        </Box>
        <Box w="50%" textAlign="center">
          <IconButton
            aria-label="Toggle theme"
            variant="ghost"
            color="gray.500"
            icon={<Icon as={colorMode === "dark" ? Sun : Moon} />}
            onClick={toggleColorMode}
          />
        </Box>
      </Flex>
      {styles}
    </Box>
  );
}
