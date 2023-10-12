import { Box, Divider, Flex, ActionIcon } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { HelpCircle } from "react-feather";
import ThemeToggle from "./ThemeToggle";

const Footer = () => (
  <Box p="10px 0">
    <Divider mb="10px" />
    <Flex>
      <Box w="50%" ta="center">
        <Link href="/about">
          <ActionIcon aria-label="About Page" variant="default" size={40}>
            <HelpCircle height={20} width={20} />
          </ActionIcon>
        </Link>
      </Box>
      <Box w="50%" ta="center">
        <ThemeToggle />
      </Box>
    </Flex>
  </Box>
);

export default Footer;
