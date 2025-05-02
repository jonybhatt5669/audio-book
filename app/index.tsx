import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        className="bg-slate-800"
      >
        <StatusBar style="auto" />
        <Text className="text-gray-100">
          Edit app/index.tsx to edit this screen.
        </Text>
      </View>
    </>
  );
}
