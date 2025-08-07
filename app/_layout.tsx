import "react-native-gesture-handler";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Chess MVP" }} />
      <Stack.Screen name="game/index" options={{ title: "Local Game" }} />
      <Stack.Screen name="online/index" options={{ title: "Online" }} />
      <Stack.Screen name="settings/index" options={{ title: "Settings" }} />
    </Stack>
  );
}