import { PlayerProvider } from "@/providers/PlayerProvider";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  const theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: "#17153B",
      card: "#021526",
    },
  };
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ThemeProvider value={theme}>
        <PlayerProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        </PlayerProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}
