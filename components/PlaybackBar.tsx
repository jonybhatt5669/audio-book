import { useState } from "react";
import { GestureResponderEvent, Pressable, View } from "react-native";

type PlaybackBarProps = {
  value: number;
  onSeek: (seconds: number) => void;
  duration: number;
};

export default function PlaybackBar({
  value,
  onSeek,
  duration,
}: PlaybackBarProps) {
  const [width, setWidth] = useState(0);
  const handleSeek = (e: GestureResponderEvent) => {
    const { nativeEvent } = e;
    // console.log("Location:", nativeEvent.locationX);
    const percentage = nativeEvent.locationX / width;
    const seekToSeconds = percentage * duration;
    onSeek(seekToSeconds);
  };
  return (
    <Pressable
      onPress={handleSeek}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={{
        width: "100%",
        height: 10,
        backgroundColor: "#dddd",
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
          top: -1,
          left: `${value * 100}%`,
          width: 12,
          height: 12,
          backgroundColor: "#6ee7b7",
          borderRadius: 6,
          transform: [{ translateX: -6 }],
        }}
      />
    </Pressable>
  );
}
