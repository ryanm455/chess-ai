import {
  Flex,
  Title,
  Container,
  ActionIcon,
  Divider,
  Box,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import { BarChart2, Play } from "react-feather";

const Navbar = () => (
  <Box
    bg="var(--mantine-color-body)"
    pos="sticky"
    top={0}
    style={{
      zIndex: 100,
      transition: "all 0.2s",
    }}
  >
    <Container
      display="flex"
      p="10px 20px"
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        transition: "all 0.2s",
      }}
    >
      <div>
        <Link
          href="/"
          style={{
            textDecoration: "none",
          }}
        >
          <Title c="#2B6CB0">chess.ai</Title>
        </Link>
      </div>
      <Flex gap="10px">
        <Link href="/stats">
          <ActionIcon
            aria-label="Stats"
            variant="default" //"ghost"
            size={40}
          >
            <BarChart2 height={20} width={20} />
          </ActionIcon>
        </Link>
        <Link href="/play">
          <ActionIcon
            aria-label="Play"
            variant="default" //"ghost"
            size={40}
          >
            <Play height={20} width={20} />
          </ActionIcon>
        </Link>
      </Flex>
    </Container>
    <Divider />
  </Box>
);

export default Navbar;
