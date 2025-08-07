import React, { useMemo } from "react";
import { View, Text, Pressable, StyleSheet, useWindowDimensions } from "react-native";
import type { Square, Move } from "chess.js";
import { useGameStore } from "../../state/gameStore";

const files = ["a","b","c","d","e","f","g","h"] as const;
const ranks = [8,7,6,5,4,3,2,1] as const;

const PIECE_TO_EMOJI: Record<string, string> = {
  K: "♔", Q: "♕", R: "♖", B: "♗", N: "♘", P: "♙",
  k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟︎",
};

function parseFenPieces(fen: string) {
  const [boardPart] = fen.split(" ");
  const rows = boardPart.split("/");
  const map: Record<Square, string> = {} as any;
  rows.forEach((row, rIdx) => {
    let fileIdx = 0;
    for (const ch of row) {
      if (/\d/.test(ch)) { fileIdx += parseInt(ch, 10); continue; }
      const sq = (files[fileIdx] + (8 - rIdx)) as Square;
      map[sq] = ch;
      fileIdx += 1;
    }
  });
  return map;
}

export function Board() {
  const { fen, selected, legalMoves, selectSquare, makeMove } = useGameStore();
  const pieces = useMemo(() => parseFenPieces(fen), [fen]);
  const { width } = useWindowDimensions();
  const size = Math.min(width - 24, 360);
  const tile = size / 8;

  function onSquarePress(sq: Square) {
    if (selected) {
      const candidate = legalMoves.find(m => (m as any).to === sq);
      if (candidate) {
        makeMove({ from: (candidate as any).from, to: (candidate as any).to, promotion: (candidate as any).promotion });
        return;
      }
    }
    selectSquare(sq);
  }

  function isDark(fileIndex: number, rankIndex: number) {
    return (fileIndex + rankIndex) % 2 === 1;
  }

  function isHighlighted(sq: Square) {
    return !!legalMoves.find(m => (m as any).to === sq);
  }

  return (
    <View style={[styles.board, { width: size, height: size }]}> 
      {ranks.map((rank, rIdx) => (
        <View key={rank} style={{ flexDirection: "row" }}>
          {files.map((file, fIdx) => {
            const sq = (file + rank) as Square;
            const piece = pieces[sq];
            const dark = isDark(fIdx, rIdx);
            const isSel = selected === sq;
            const hl = isHighlighted(sq);
            return (
              <Pressable
                key={sq}
                onPress={() => onSquarePress(sq)}
                style={[styles.tile, { width: tile, height: tile, backgroundColor: dark ? "#769656" : "#eeeed2" }, isSel && styles.selected, hl && styles.highlight]}
              >
                {piece && <Text style={styles.piece}>{PIECE_TO_EMOJI[piece]}</Text>}
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: { borderWidth: 2, borderColor: "#1f2937", borderRadius: 8, overflow: "hidden" },
  tile: { alignItems: "center", justifyContent: "center" },
  selected: { outlineStyle: "solid", outlineWidth: 2, outlineColor: "#f59e0b" },
  highlight: { opacity: 0.92 },
  piece: { fontSize: 28 },
});