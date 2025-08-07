import { View, Text, StyleSheet } from "react-native";

export default function OnlineScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Online (stub)</Text>
      <Text>Connect Supabase and Realtime here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", gap: 8 },
  title: { fontSize: 22, fontWeight: "700" },
});