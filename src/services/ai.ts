import { Chess, Move } from "chess.js";

export function pickRandomMove(game: Chess): Move | null {
  const moves = game.moves({ verbose: true }) as unknown as Move[];
  if (moves.length === 0) return null;
  return moves[Math.floor(Math.random() * moves.length)];
}