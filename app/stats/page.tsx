import { Container, Title, Table } from "@mantine/core";
import StatsTableContent from "components/StatsTableContent";

const Stats = () => (
  <Container pt="20px" maw="4xl" p={5}>
    <>
      <Title pb="10px">Stats</Title>
      <Table variant="simple">
        <thead>
          <tr>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <StatsTableContent />
        </tbody>
      </Table>
    </>
  </Container>
);

export default Stats;
