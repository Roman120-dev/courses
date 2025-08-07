import { Chess, Move, Square } from "chess.js";

export function createGame(initialFen?: string) {
  return new Chess(initialFen);
}

export function getLegalMoves(game: Chess, from?: Square) {
  return game.moves({ verbose: true, square: from }) as unknown as Move[];
}

export function isPromotionMove(move: Move) {
  return (move as any).flags?.includes("p");
}