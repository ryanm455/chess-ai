import {
  Chess,
  ChessInstance,
  Piece,
  PieceColor,
  PieceType,
  Square,
} from "chess.js";

let chess: ChessInstance | null = null;
let positions = 0;

const reverseArray = (array: number[][]) => array.slice().reverse();

const pawnEvalWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
  [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
  [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
  [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
  [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
  [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
];

const pawnEvalBlack = reverseArray(pawnEvalWhite);

const knightEval = [
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
  [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
  [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
  [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
  [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
  [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
  [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
  [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
];

const bishopEvalWhite = [
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
  [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
  [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
  [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
  [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
  [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
];

const bishopEvalBlack = reverseArray(bishopEvalWhite);

const rookEvalWhite = [
  [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
  [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],
];

const rookEvalBlack = reverseArray(rookEvalWhite);

const evalQueen = [
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
  [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
  [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
  [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
  [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
];

const kingEvalWhite = [
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
  [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
  [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
  [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
  [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0],
];

const kingEvalBlack = reverseArray(kingEvalWhite);

const getPieceValue = (piece: Piece, x: number, y: number) => {
  if (piece === null) return 0;

  const isWhite = piece.color === "w";

  const absoluteValue = () => {
    switch (piece.type) {
      case "p":
        return 10 + (isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x]);
      case "r":
        return 50 + (isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x]);
      case "n":
        return 30 + knightEval[y][x];
      case "b":
        return 30 + (isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x]);
      case "q":
        return 90 + evalQueen[y][x];
      case "k":
        return 900 + (isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x]);
      default:
        throw `Unknown piece type: ${piece.type}`;
    }
  };

  const a = absoluteValue();

  return piece.color === "w" ? a : -a;
};

const evaluateBoard = (
  board: { type: PieceType; color: PieceColor; square: Square }[][]
) => {
  let totalEvaluation = 0;

  for (let i in board) {
    for (let j in board[i]) {
      totalEvaluation += getPieceValue(board[i][j], parseInt(i), parseInt(j));
    }
  }

  return totalEvaluation;
};

const minimax = (
  currentDepth: number,
  chessState: ChessInstance,
  alpha: number,
  beta: number,
  isMaximizingPlayer: boolean
) => {
  positions++;
  if (currentDepth === 0) return -evaluateBoard(chessState.board() as any);

  const MathFunc = Math[isMaximizingPlayer ? "max" : "min"];

  const moves = chessState.moves();

  let bestValue = isMaximizingPlayer ? -9999 : 9999;

  for (let move of moves) {
    chessState.move(move);
    bestValue = MathFunc(
      bestValue,
      minimax(currentDepth - 1, chessState, alpha, beta, !isMaximizingPlayer)
    );
    chessState.undo();

    if (isMaximizingPlayer) {
      alpha = MathFunc(alpha, bestValue);
    } else {
      beta = MathFunc(beta, bestValue);
    }
    if (beta <= alpha) return bestValue;
  }
  return bestValue;
};

const findBestMove = (depth: number, isMaximizingPlayer: boolean): string => {
  const moves = chess!.moves();

  let bestMove: string | null = null;
  let bestValue = -9999;

  for (let move of moves) {
    chess!.move(move);
    const boardValue = minimax(
      depth - 1,
      chess!,
      -10000,
      10000,
      !isMaximizingPlayer
    );
    chess!.undo();

    if (boardValue >= bestValue) {
      bestValue = boardValue;
      bestMove = move;
    }
  }

  return bestMove!;
};

const ctx: Worker = self as any;

ctx.addEventListener("message", ({ data: { fen, depth } }) => {
  chess = new Chess(fen);

  const d = Date.now();
  const bestMove = findBestMove(depth, true);

  ctx.postMessage({
    bestMove,
    positions,
    timeTaken: Date.now() - d,
    evaluation: evaluateBoard(chess.board() as any),
  });
});

export default {};
