import dummyBooks from "@/utils/dummyBooks";
import { AntDesign } from "@expo/vector-icons";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";
export default function FloatingPlayer() {
  const item = dummyBooks[0];
  const player = useAudioPlayer({ uri: item.audio_url });
  const audioStatus = useAudioPlayerStatus(player);
  return (
    <Link href="/player" asChild>
      <LinearGradient
        colors={["#44A08D", "#0f3443"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex-row items-center gap-2 w-full"
        style={{ padding: 8 }}
      >
        <Image
          source={{ uri: item.thumbnail_url }}
          className="aspect-square w-16"
        />
        <View className="gap-1 flex-1">
          <Text className="font-bold text-gray-100  text-2xl">
            {item.title}
          </Text>
          <Text className="font-normal text-gray-400">{item.author}</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <AntDesign
            name={audioStatus.playing ? "pause" : "play"}
            size={22}
            color="gainsboro"
            onPress={audioStatus.playing ? player.pause : player.play}
          />
        </View>
      </LinearGradient>
    </Link>
  );
}
