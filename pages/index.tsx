import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Heading,
  Text,
  Flex,
  Box,
  Icon,
  useColorMode,
} from "@chakra-ui/react";
import { Play } from "react-feather";
import dynamic from "next/dynamic";
import css from "styled-jsx/css";

const InstallButton = dynamic(() => import("components/InstallButton"));

const bigBox = css.resolve`
  div {
    content-visibility: auto;
    contain-intrinsic-size: 0 400px;
  }
`;

const smallerBox = css.resolve`
  div {
    content-visibility: auto;
    contain-intrinsic-size: 0 200px;
  }
`;

function Index() {
  const { colorMode } = useColorMode();

  return (
    <>
      <Flex
        height="400px"
        bg={colorMode === "light" ? "gray.100" : "gray.700"}
        className={bigBox.className}
      >
        <Flex width="100%" alignItems="center" justifyContent="center">
          <Image
            src="/img/chessboard.png"
            alt="Image of a chessboard"
            width={200}
            height={200}
            layout="intrinsic"
            priority
          />
        </Flex>
        <Flex width="100%" alignItems="center">
          <Box p="20px">
            <Heading>Play against AI</Heading>
            <Text fontSize="md">Helps improve your skills</Text>
          </Box>
        </Flex>
      </Flex>
      <Flex height="400px" className={bigBox.className}>
        <Flex
          width="100%"
          alignItems="center"
          justifyContent="flex-end"
          textAlign="right"
        >
          <Box p="20px">
            <Heading>Play offline</Heading>
            <Text fontSize="md">Play anywhere you want</Text>
          </Box>
        </Flex>
        <Flex width="100%" alignItems="center" justifyContent="center">
          <Image
            src="/img/offline.svg"
            alt="App install"
            width={200}
            height={200}
            layout="intrinsic"
          />
        </Flex>
      </Flex>
      <Flex
        height="400px"
        bg={colorMode === "light" ? "gray.100" : "gray.700"}
        className={bigBox.className}
      >
        <Flex width="100%" alignItems="center" justifyContent="center">
          <Image
            src="/img/app-install.svg"
            alt="App install"
            width={200}
            height={200}
            layout="intrinsic"
          />
        </Flex>
        <Flex width="100%" alignItems="center">
          <Box p="20px">
            <Heading>Install it</Heading>
            <Text fontSize="md">
              Add it to your home screen for easy access
            </Text>
            <InstallButton />
          </Box>
        </Flex>
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        height="200px"
        className={smallerBox.className}
      >
        <Box textAlign="center">
          <Heading pb="15px">Play Now!</Heading>
          <Link href="/play">
            <Button rightIcon={<Icon as={Play} />}>Play</Button>
          </Link>
        </Box>
      </Flex>

      {bigBox.styles}
      {smallerBox.styles}
    </>
  );
}

export default Index;
