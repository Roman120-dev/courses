import { Link } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chess MVP</Text>
      <Link href="/game" asChild>
        <Pressable style={styles.btn}><Text style={styles.btnText}>Play: Local</Text></Pressable>
      </Link>
      <Link href="/online" asChild>
        <Pressable style={styles.btn}><Text style={styles.btnText}>Play: Online</Text></Pressable>
      </Link>
      <Link href="/settings" asChild>
        <Pressable style={styles.btn}><Text style={styles.btnText}>Settings</Text></Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 12 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 24 },
  btn: { backgroundColor: "#111827", paddingVertical: 12, paddingHorizontal: 18, borderRadius: 10, width: 220 },
  btnText: { color: "white", textAlign: "center", fontSize: 16, fontWeight: "600" },
});