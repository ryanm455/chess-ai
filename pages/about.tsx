import {
  Heading,
  Container,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link,
  Icon,
  Flex,
  ListItem,
  List,
} from "@chakra-ui/react";
import React from "react";
import { ExternalLink } from "react-feather";
import readPkg from "read-pkg";

const About = (props) => (
  <Container centerContent pt="20px">
    <Heading pb="10px">Packages Used</Heading>
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Package</Th>
          <Th>Version</Th>
        </Tr>
      </Thead>
      <Tbody>
        {[
          ...Object.entries(props.dependencies),
          ...Object.entries(props.devDependencies),
        ].map((e) => (
          <Tr key={e[0]}>
            <Td>{e[0]}</Td>
            <Td>{e[1]}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
    <Heading p="10px 0">Special Thanks</Heading>
    <List>
      <ListItem>
        <Flex gridGap="5px" alignItems="center">
          <Link href="https://icons8.com/icons/set/game-chess" isExternal>
            Chess icon <Icon as={ExternalLink} mx="2px" />
          </Link>
          icon by
          <Link href="https://icons8.com" isExternal>
            Icons8 <Icon as={ExternalLink} mx="2px" />
          </Link>
        </Flex>
      </ListItem>
      <ListItem>
        Images from{" "}
        <Link href="https://undraw.co" isExternal>
          undraw <Icon as={ExternalLink} mx="2px" />
        </Link>
      </ListItem>
    </List>
  </Container>
);

export async function getStaticProps() {
  const { dependencies, devDependencies } = await readPkg();

  return {
    props: {
      dependencies,
      devDependencies,
    },
  };
}

export default About;
