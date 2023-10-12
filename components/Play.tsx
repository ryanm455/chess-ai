"use client";
import {
  Button,
  Flex,
  List,
  ListItem,
  Select,
  Stack,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Text,
} from "@mantine/core";
import { Chess, ChessInstance, ShortMove } from "chess.js";
import { useStatsStore } from "hooks/stats";
import React, { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Square } from "react-chessboard/dist/chessboard/types";
import { modals } from "@mantine/modals";
import { useRouter } from "next/navigation";

type AIStats = {
  positions: number;
  timeTaken: number;
  evaluation: number;
};

const Play = () => {
  const [depth, setDepth] = useState<number>(3);
  const [stats, setStats] = useState<AIStats>({
    positions: 0,
    timeTaken: 0,
    evaluation: 0,
  });
  const gameStats = useStatsStore((state) => state);
  const [game, setGame] = useState<ChessInstance>(new Chess());
  const router = useRouter();

  const makeAMove = (move: ShortMove) => {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result;
  };

  const resetGame = () => setGame(new Chess());

  const checkWin = (): boolean => {
    if (game.game_over()) {
      if (game.in_checkmate()) {
        gameStats[game.turn() === "b" ? "incrementWins" : "incrementLosses"]();
      } else {
        gameStats.incrementDraws();
      }
      openModal(
        game.game_over() && game.in_checkmate()
          ? game.turn() === "b"
            ? "Black Won"
            : "You Lost"
          : "You Drew"
      );
      return true;
    }
    return false;
  };

  const aiPlay = async () => {
    // @ts-ignore
    const Worker = await import("worker-loader!../utils/aiPlayLogic").then(
      (e) => e.default
    );
    // @ts-ignore
    const worker = new Worker();

    worker.postMessage({ fen: game.fen(), depth });
    worker.onmessage = function ({ data: { bestMove, ...stats } }) {
      worker.terminate();

      makeAMove(bestMove);

      setStats(stats as AIStats);
      checkWin();
    };
  };

  const onPieceDrop = (sourceSquare: Square, targetSquare: Square): boolean => {
    if (game.get(sourceSquare)!.color === "b") return false;

    const move = makeAMove({
      to: targetSquare,
      from: sourceSquare,
      promotion: "q",
    });

    if (move === null || checkWin()) return false;

    aiPlay();

    return true;
  };

  const openModal = (gameStatus: String) =>
    modals.openConfirmModal({
      title: "Game Ended",
      children: <Text size="sm">{gameStatus}!</Text>,
      labels: { confirm: "Play Again", cancel: "View Stats" },
      onCancel: () => router.push("/stats"),
      onConfirm: () => resetGame(),
    });

  const history = game.history({ verbose: true });

  return (
    <>
      <Flex
        w="100%"
        mih="calc(100vh - 64px)"
        direction={{ base: "column", md: "row" }}
      >
        <Flex justify="center" align="center" m="0 auto">
          <Chessboard
            position={game.fen()}
            onPieceDrop={onPieceDrop}
            boardWidth={500}
          />
        </Flex>
        <Tabs
          miw={{ base: "100%", md: "clamp(100px, 35%, 50%)" }}
          defaultValue="History"
        >
          <TabsList>
            <TabsTab value="History">History</TabsTab>
            <TabsTab value="AI Stats">AI Stats</TabsTab>
            <TabsTab value="Options">Options</TabsTab>
          </TabsList>
          <TabsPanel value="History" p={10}>
            <List
              spacing={3}
              mah="calc(100vh - 106px - 2rem)"
              style={{ overflow: "auto" }}
            >
              {history.length ? (
                history.map((e, idx) => (
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
          </TabsPanel>
          <TabsPanel value="AI Stats" p={10}>
            <List>
              <ListItem>Positions Calculated: {stats.positions}</ListItem>
              <ListItem>Time Taken: {stats.timeTaken}ms</ListItem>
              <ListItem>Evaluation: {stats.evaluation}</ListItem>
            </List>
          </TabsPanel>
          <TabsPanel value="Options" p={10}>
            <Stack>
              <Button onClick={resetGame}>Reset Game</Button>
              <Button onClick={() => (game.undo(), game.undo())}>Undo</Button>
              <Select
                placeholder="Change Depth (Changes Difficulty and Calculation Speed)"
                onChange={(v) => v?.length && setDepth(parseInt(v!))}
                data={[1, 2, 3, 4].map(
                  (e) =>
                    e.toString() +
                    (depth === e && depth === 3
                      ? " (Current, Default)"
                      : depth === 3
                      ? " (Default)"
                      : depth === e
                      ? " (Current)"
                      : "")
                )}
              />
            </Stack>
          </TabsPanel>
        </Tabs>
      </Flex>
    </>
  );
};

export default Play;
