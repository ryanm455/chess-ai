import Link from "next/link";
import { Button, Title, Flex, Box } from "@mantine/core";
import { Monitor, Play } from "react-feather";
import AppInstall from "components/AppInstall";
import Offline from "components/Offline";
import HomeSection from "components/HomeSection";

const data = [
  {
    heading: "Play against AI",
    subheading: "Helps improve your skills",
    icon: <Monitor width={100} height={100} />,
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

const Home = () => (
  <>
    {data.map((e, i) => {
      const odd = (i + 1) % 2 === 0;
      return <HomeSection odd={odd} idx={i} {...e} key={i} />;
    })}
    <Flex justify="center" align="center" h="200px">
      <Box ta="center">
        <Title pb="15px">Play Now!</Title>
        <Link href="/play">
          <Button rightSection={<Play />}>Play</Button>
        </Link>
      </Box>
    </Flex>
  </>
);

export default Home;
