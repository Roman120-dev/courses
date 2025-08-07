import { View, Text, StyleSheet, Pressable } from "react-native";
import { useGameStore } from "../../src/state/gameStore";
import { Board } from "../../src/components/chess/Board";

export default function GameScreen() {
  const { resetGame, turn, result } = useGameStore();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Local Game</Text>
      <Board />
      <View style={styles.row}>
        <Text>Turn: {turn === "w" ? "White" : "Black"}</Text>
        {result && <Text>Result: {result}</Text>}
      </View>
      <Pressable style={styles.btn} onPress={resetGame}>
        <Text style={styles.btnText}>New Game</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 16, padding: 12 },
  header: { fontSize: 22, fontWeight: "700" },
  row: { flexDirection: "row", gap: 12 },
  btn: { backgroundColor: "#2563eb", paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
  btnText: { color: "white", fontWeight: "700" },
});