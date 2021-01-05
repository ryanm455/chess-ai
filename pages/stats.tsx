import React, { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Tr,
  Th,
  Thead,
} from "@chakra-ui/react";
import { Stats as StatsType } from "types/stats";

export default function Stats() {
  const [stats, setStats] = useState<StatsType>(null);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      setStats(
        JSON.parse(
          localStorage.getItem("stats") ||
            '{ "wins": 0, "draws": 0, "loses": 0 }'
        )
      );
    }
  }, []);

  return (
    <Container pt="20px" centerContent>
      {stats ? (
        <>
          <Heading>Stats</Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Category</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Object.entries(stats).map((e) => (
                <Tr key={e[0]}>
                  <Td>{e[0].charAt(0).toUpperCase() + e[0].slice(1)}</Td>
                  <Td>{e[1]}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      ) : (
        <Heading>Your stats could not be retrieved</Heading>
      )}
    </Container>
  );
}
