import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  const theme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
    },
  };
  return (
    <ThemeProvider value={theme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
