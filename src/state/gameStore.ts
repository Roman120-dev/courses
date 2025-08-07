import { create } from "zustand";
import { Chess, Color, Move, Square } from "chess.js";

export type GameResult = "1-0" | "0-1" | "1/2-1/2" | null;

type GameState = {
  chess: Chess;
  fen: string;
  turn: Color;
  result: GameResult;
  selected: Square | null;
  legalMoves: Move[];
  resetGame: () => void;
  selectSquare: (sq: Square | null) => void;
  makeMove: (move: { from: Square; to: Square; promotion?: string }) => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  chess: new Chess(),
  fen: new Chess().fen(),
  turn: "w",
  result: null,
  selected: null,
  legalMoves: [],
  resetGame: () => set(() => {
    const chess = new Chess();
    return { chess, fen: chess.fen(), turn: chess.turn(), result: null, selected: null, legalMoves: [] };
  }),
  selectSquare: (sq) => set((state) => {
    if (!sq) return { selected: null, legalMoves: [] };
    const moves = state.chess.moves({ square: sq, verbose: true }) as unknown as Move[];
    return { selected: sq, legalMoves: moves };
  }),
  makeMove: ({ from, to, promotion }) => set((state) => {
    const move = state.chess.move({ from, to, promotion });
    if (!move) return {} as any;
    const over = state.chess.isGameOver();
    let result: GameResult = null;
    if (over) {
      if (state.chess.isCheckmate()) result = state.turn === "w" ? "0-1" : "1-0";
      else result = "1/2-1/2";
    }
    return {
      fen: state.chess.fen(),
      turn: state.chess.turn(),
      result,
      selected: null,
      legalMoves: []
    };
  }),
}));