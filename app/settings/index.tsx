import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function SettingsScreen() {
  const [level, setLevel] = useState<number>(2);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text>AI difficulty: {level}</Text>
      <View style={styles.row}>
        {[1,2,3].map(l => (
          <Pressable key={l} style={[styles.btn, level===l && styles.btnActive]} onPress={() => setLevel(l)}>
            <Text style={styles.btnText}>{l}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={{opacity:0.7}}>Wire this to AI later</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  title: { fontSize: 22, fontWeight: "700" },
  row: { flexDirection: "row", gap: 12 },
  btn: { backgroundColor: "#111827", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  btnActive: { backgroundColor: "#2563eb" },
  btnText: { color: "white", fontWeight: "700" },
});