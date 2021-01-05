import {
  Button,
  List,
  ListItem,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import * as ChessJS from "chess.js";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import Chessground from "react-chessground";
import "react-chessground/dist/styles/chessground.css";
import css from "styled-jsx/css";
import { Stats } from "types/stats";
import { WinStatus } from "types/winStatus";

const FinishModal = dynamic(() => import("components/FinishModal"));

const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

const chess = new Chess();

const tab = css.resolve`
  div {
    width: 100%;
    padding-top: 20px;
  }

  @media screen and (min-width: 1200px) {
    div {
      width: calc(100vw - 100vh + 64px);
      padding-top: 10px;
    }
  }
`;

const stack = css.resolve`
  div {
    flex-direction: column;
  }

  @media screen and (min-width: 1200px) {
    div {
      flex-direction: row;
    }
  }
`;

const list = css.resolve`
  ul {
    max-height: 500px;
  }
  @media screen and (min-width: 1200px) {
    ul {
      max-height: calc(100vh - 156px);
    }
  }
`;

const Play = () => {
  let currentStats: Stats = { wins: 0, draws: 0, loses: 0 };
  const [depth, setDepth] = useState<number>(3);
  const [fen, setFen] = useState<string>();
  const [stats, setStats] = useState({
    positions: 0,
    timeTaken: 0,
    evaluation: 0,
  });
  const [winStatus, setWinStatus] = useState<WinStatus>(null);
  const [chessHistory, setChessHistory] = useState<ChessJS.Move[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (typeof window !== "undefined")
      currentStats = JSON.parse(
        localStorage.getItem("stats") || '{ "wins": 0, "draws": 0, "loses": 0 }'
      );
  }, []);

  const resetGame = () => {
    chess.reset();
    setChessHistory(chess.history({ verbose: true }));
    setFen(chess.fen());
  };

  const checkWin = (): boolean => {
    const inCheck = chess.in_checkmate();
    if (inCheck) {
      console.log(inCheck);
      const win = chess.turn() === "b";

      currentStats[win ? "wins" : "loses"]++;
      localStorage.setItem("stats", JSON.stringify(currentStats));

      setWinStatus(win ? "win" : "lose");
      onOpen();
    } else if (chess.game_over()) {
      currentStats.draws++;
      localStorage.setItem("stats", JSON.stringify(currentStats));

      setWinStatus("draw");
      onOpen();
    } else {
      return false;
    }

    return true;
  };

  const aiPlay = async () => {
    // @ts-ignore
    const Worker = await import("worker-loader!../utils/aiPlayLogic").then(
      (e) => e.default
    );
    const worker = new Worker();

    worker.postMessage({ fen: chess.fen(), depth });
    worker.onmessage = function ({
      data: { bestMove, positions, timeTaken, evaluation },
    }) {
      worker.terminate();

      chess.move(bestMove);

      setChessHistory(chess.history({ verbose: true }));
      setFen(chess.fen());
      setStats({ positions, timeTaken, evaluation });
      checkWin();
    };
  };

  const onMove = (from: ChessJS.Square, to: ChessJS.Square) => {
    if (chess.get(from).color === "b") return;

    const move = chess.move({
      to,
      from,
      promotion: "q",
    });

    if (move) {
      setChessHistory(chess.history({ verbose: true }));
      setFen(chess.fen());
    }

    if (!checkWin()) aiPlay();
  };

  const movable = () => {
    const dests: { [key: string]: string[] } = {};

    Object.defineProperty(dests, "get", {
      value: (val: string) => dests[val],
      writable: false,
    });

    chess.SQUARES.forEach((s) => {
      const ms = chess.moves({ square: s, verbose: true });
      if (ms.length) dests[s] = ms.map((m) => m.to);
    });

    return {
      free: false,
      dests,
      color: "white",
      dropOff: "revert",
      showDests: chess.turn() === "w" ? true : false,
    };
  };

  return (
    <>
      <Stack className={stack.className}>
        <Chessground
          coordinates={false}
          fen={fen}
          onMove={onMove}
          movable={movable()}
          turnColor={chess.turn() === "w" ? "white" : "black"}
        />
        <Tabs className={tab.className}>
          <TabList>
            <Tab>History</Tab>
            <Tab>AI Stats</Tab>
            <Tab>Options</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <List spacing={3} overflow="auto" className={list.className}>
                {chessHistory.length ? (
                  chessHistory.map((e, idx) => (
                    <ListItem key={`${e.san}-${idx}`}>
                      {e.color === "w" ? "White" : "Black"} Moved From {e.from},
                      To {e.to}
                      {e.captured && `, Capturing ${e.captured}`}
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    No history yet. Start by moving a chess piece.
                  </ListItem>
                )}
              </List>
            </TabPanel>
            <TabPanel>
              <List>
                <ListItem>Positions Calculated: {stats.positions}</ListItem>
                <ListItem>Time Taken: {stats.timeTaken}ms</ListItem>
                <ListItem>Evaluation: {stats.evaluation}</ListItem>
              </List>
            </TabPanel>
            <TabPanel>
              <Stack>
                <Button onClick={resetGame}>Reset Game</Button>
                <Button
                  onClick={() => {
                    chess.undo();
                    chess.undo();
                    setFen(chess.fen());
                    setChessHistory(chess.history({ verbose: true }));
                  }}
                  disabled={
                    chessHistory.length &&
                    chessHistory.slice(-1)[0].color === "w"
                  }
                >
                  Undo
                </Button>
                <Select
                  placeholder="Change Depth (Changes Difficulty and Calculation Speed)"
                  onChange={(e) => {
                    if (e.target.value.length) {
                      setDepth(parseInt(e.target.value));
                    }
                  }}
                >
                  {[1, 2, 3, 4].map((e) => (
                    <option value={e} key={e}>
                      {e}
                      {depth === e && depth === 3
                        ? " (Current, Default)"
                        : depth === 3
                        ? " (Default)"
                        : depth === e
                        ? " (Current)"
                        : null}
                    </option>
                  ))}
                </Select>
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
      <FinishModal
        isOpen={isOpen}
        winStatus={winStatus}
        onClose={() => {
          onClose();
          resetGame();
        }}
      />
      <style jsx global>{`
        .cg-wrap.orientation-white.manipulable {
          width: 100vw;
          height: 100vw;
        }

        @media screen and (min-width: 1200px) {
          .cg-wrap.orientation-white.manipulable {
            width: calc(100vh - 64px);
            height: calc(100vh - 64px);
          }
        }
      `}</style>
      {tab.styles}
      {stack.styles}
      {list.styles}
    </>
  );
};

export default Play;
