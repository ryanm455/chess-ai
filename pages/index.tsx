import React from "react";
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
import { Monitor, Play } from "react-feather";
import dynamic from "next/dynamic";
import AppInstall from "components/AppInstall";
import Offline from "components/Offline";

const InstallButton = dynamic(() => import("components/InstallButton"));

const data = [
  {
    heading: "Play against AI",
    subheading: "Helps improve your skills",
    icon: <Icon as={Monitor} width={100} height={100} />,
  },
  {
    heading: "Play offline",
    subheading: "Play anywhere you want",
    icon: <Offline width="200" />,
  },
  {
    heading: "Install it",
    subheading: "Add it to your home screen for easy access",
    icon: <AppInstall width="200" />,
    installBtn: true,
  },
];

function Index() {
  const { colorMode } = useColorMode();

  return (
    <>
      {data.map((e, i) => {
        const odd = (i + 1) % 2 === 0;
        return (
          <Flex
            height="400px"
            bg={
              !odd
                ? colorMode === "light"
                  ? "gray.100"
                  : "gray.700"
                : undefined
            }
            flexDirection={odd ? "row-reverse" : undefined}
            key={i}
          >
            <Flex width="100%" alignItems="center" justifyContent="center">
              {e.icon}
            </Flex>
            <Flex
              width="100%"
              alignItems="center"
              textAlign={odd ? "right" : undefined}
              justifyContent={odd ? "flex-end" : undefined}
            >
              <Box p="20px">
                <Heading>{e.heading}</Heading>
                <Text fontSize="md">{e.subheading}</Text>
                {e.installBtn && <InstallButton />}
              </Box>
            </Flex>
          </Flex>
        );
      })}
      <Flex justifyContent="center" alignItems="center" height="200px">
        <Box textAlign="center">
          <Heading pb="15px">Play Now!</Heading>
          <Link href="/play">
            <Button rightIcon={<Icon as={Play} />}>Play</Button>
          </Link>
        </Box>
      </Flex>
    </>
  );
}

export default Index;
