import { View } from "react-native";

export default function PlaybackBar({ value }: { value: number }) {
  return (
    <View
      style={{
        width: "100%",
        height: 10,
        backgroundColor: "#ccc",
        borderRadius: 999,
        justifyContent: "center",
        position: "relative",
        marginVertical: 20,
      }}
    >
      <View
        style={{
          width: `${value * 100}%`,
          height: "100%",
          backgroundColor: "#10b981",
          borderRadius: 999,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: `${value * 100}%`,
          width: 12,
          height: 12,
          backgroundColor: "#6ee7b7",
          borderRadius: 6,
          transform: [{ translateX: -6 }],
        }}
      />
    </View>
  );
}
