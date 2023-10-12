import { Title, Container, Table, Flex, ListItem, List, Anchor } from "@mantine/core";
import { readPackage } from "read-pkg";

const About = async () => {
  const { dependencies, devDependencies } = await readPackage();

  return (
    <Container pt="20px" maw="4xl" p={5}>
      <Title pb="10px">Packages Used</Title>
      <Table variant="simple">
        <thead>
          <tr>
            <th>Package</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
          {[
            ...Object.entries(dependencies ?? {}),
            ...Object.entries(devDependencies ?? {}),
          ].map((e) => (
            <tr key={e[0]}>
              <td>{e[0]}</td>
              <td>{e[1]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Title p="10px 0" mt={4}>
        Special thanks
      </Title>
      <List mb={3}>
        <ListItem>
          <Flex gap="5px" align="center">
            <Anchor href="https://icons8.com/icons/set/game-chess" target="_blank">
              Chess icon
            </Anchor>
            icon by
            <Anchor href="https://icons8.com" target="_blank">
              Icons8
            </Anchor>
          </Flex>
        </ListItem>
        <ListItem>
          Images from{" "}
          <Anchor href="https://undraw.co" target="_blank">
            undraw
          </Anchor>
        </ListItem>
      </List>
    </Container>
  );
};

export default About;
