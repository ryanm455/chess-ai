"use client";
import { Box, Flex, Title, Text } from "@mantine/core";
import useColorModeValue from "./useColorModeValue";
import dynamic from "next/dynamic";

const InstallButton = dynamic(() => import("components/InstallButton"));

type Props = {
  odd: boolean;
  idx: number;
  heading: string;
  subheading: string;
  icon: React.ReactNode;
  installBtn?: boolean;
};

const HomeSection = ({
  odd,
  idx,
  heading,
  subheading,
  icon,
  installBtn = false,
}: Props) => (
  <Flex
    h="400px"
    bg={!odd ? useColorModeValue("#EDF2F7", "#2D3748") : undefined}
    dir={odd ? "row-reverse" : undefined}
    key={idx}
  >
    <Flex w="100%" align="center" justify="center">
      {icon}
    </Flex>
    <Flex
      w="100%"
      align="center"
      ta={odd ? "right" : undefined}
      content={odd ? "flex-end" : undefined}
    >
      <Box p="20px">
        <Title>{heading}</Title>
        <Text size="md">{subheading}</Text>
        {installBtn && <InstallButton />}
      </Box>
    </Flex>
  </Flex>
);

export default HomeSection;
