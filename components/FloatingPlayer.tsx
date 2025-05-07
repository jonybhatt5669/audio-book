import { usePlayer } from "@/providers/PlayerProvider";
import { AntDesign } from "@expo/vector-icons";
import { useAudioPlayerStatus } from "expo-audio";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
export default function FloatingPlayer() {
  const { player, book } = usePlayer();
  const audioStatus = useAudioPlayerStatus(player);
  return (
    <LinearGradient
      colors={["#44A08D", "#0f3443"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ padding: 8 }}
    >
      <Link href="/player" asChild>
        <Pressable className="flex-row items-center gap-2 w-full">
          <Image
            source={{ uri: book.thumbnail_url }}
            className="aspect-square w-16"
          />
          <View className="gap-1 flex-1">
            <Text className="font-bold text-gray-100  text-2xl">
              {book.title}
            </Text>
            <Text className="font-normal text-gray-400">{book.author}</Text>
          </View>
          <View className="flex-row items-center gap-4">
            <AntDesign
              name={audioStatus.playing ? "pause" : "play"}
              size={22}
              color="gainsboro"
              onPress={() =>
                audioStatus.playing ? player.pause() : player.play()
              }
            />
          </View>
        </Pressable>
      </Link>
    </LinearGradient>
  );
}
