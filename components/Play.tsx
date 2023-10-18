"use client";
import type { Chess as ChessType, ChessInstance, ShortMove } from "chess.js";
import type { Square } from "react-chessboard/dist/chessboard/types";
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
import { useRouter } from "next/navigation";
import { useStatsStore } from "hooks/stats";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const BOARD_SIZE = 500;

const Chessboard = dynamic(
  () => import("react-chessboard").then((i) => i.Chessboard),
  {
    ssr: false,
    loading: () => (
      <div
        style={{ width: BOARD_SIZE, height: BOARD_SIZE, background: "#f0d9b5" }}
      />
    ),
  }
);

let Chess: typeof ChessType | undefined;

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
  const [game, setGame] = useState<ChessInstance | undefined>(Chess ? new Chess() : undefined);
  const router = useRouter();

  const makeAMove = (move: ShortMove) => {
    const gameCopy = { ...game! };
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result;
  };

  const resetGame = () => setGame(new Chess!());

  const checkWin = (): boolean => {
    if (game!.game_over()) {
      if (game!.in_checkmate()) {
        gameStats[game!.turn() === "b" ? "incrementWins" : "incrementLosses"]();
      } else {
        gameStats.incrementDraws();
      }
      openModal(
        game!.game_over() && game!.in_checkmate()
          ? game!.turn() === "b"
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

    worker.postMessage({ fen: game!.fen(), depth });
    worker.onmessage = function ({ data: { bestMove, ...stats } }) {
      worker.terminate();

      makeAMove(bestMove);

      setStats(stats as AIStats);
      checkWin();
    };
  };

  const onPieceDrop = (sourceSquare: Square, targetSquare: Square): boolean => {
    if (game!.get(sourceSquare)!.color === "b") return false;

    const move = makeAMove({
      to: targetSquare,
      from: sourceSquare,
      promotion: "q",
    });

    if (move === null || checkWin()) return false;

    aiPlay();

    return true;
  };

  const openModal = async (gameStatus: String) =>
    (await import("@mantine/modals").then((i) => i.modals)).openConfirmModal({
      title: "Game Ended",
      children: <Text size="sm">{gameStatus}!</Text>,
      labels: { confirm: "Play Again", cancel: "View Stats" },
      onCancel: () => router.push("/stats"),
      onConfirm: () => resetGame(),
    });

  useEffect(() => {
    if (!Chess) {
      import("chess.js").then((e) => {
        Chess = e.Chess;
        setGame(new Chess());
      });
    }
  }, []);

  const history = game ? game.history({ verbose: true }) : [];

  return (
    <>
      <Flex
        w="100%"
        mih="calc(100vh - 64px)"
        direction={{ base: "column", md: "row" }}
      >
        <Flex justify="center" align="center" m="0 auto">
          <Chessboard
            position={game?.fen()}
            onPieceDrop={onPieceDrop}
            boardWidth={BOARD_SIZE}
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
              <Button onClick={game && resetGame} disabled={!game}>
                Reset Game
              </Button>
              <Button
                onClick={() => game && (game.undo(), game.undo())}
                disabled={!game}
              >
                Undo
              </Button>
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
