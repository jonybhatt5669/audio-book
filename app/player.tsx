import PlaybackBar from "@/components/PlaybackBar";
import { usePlayer } from "@/providers/PlayerProvider";
import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayerStatus } from "expo-audio";
import { useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Player() {
  const router = useRouter();
  const { player, book } = usePlayer();
  const audioStatus = useAudioPlayerStatus(player);
  const time = audioStatus.currentTime / audioStatus.duration;
  const formatDuration = () => {
    const minutes = Math.floor(audioStatus.duration / 60);
    const seconds = Math.floor(audioStatus.duration % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <View className="flex-row items-center justify-between w-full pt-10 px-4">
        <Ionicons
          name="chevron-down"
          size={24}
          color="white"
          onPress={() => router.back()}
        />
        <Text className="text-gray-100 line-clamp-1 font-semibold truncate">
          {book?.title}
        </Text>
        <Ionicons name="cog" size={24} color="white" />
      </View>
      <SafeAreaView className="flex-1 items-center py-8 px-6">
        <View className="gap-4">
          <Image
            source={{ uri: book?.thumbnail_url }}
            className="w-[95%] aspect-square rounded-3xl object-contain self-center"
          />

          <View className="gap-2">
            <Text className="text-gray-100 text-3xl font-semibold text-center">
              {book?.title}
            </Text>
            <Text className="text-gray-400 text-lg font-semibold text-center">
              {book?.author}
            </Text>
          </View>
        </View>

        <View className="flex-1 items-center w-full justify-end mb-8">
          <View className="flex-row justify-between items-center w-full">
            <Text className="text-sm text-gray-600 font-normal">
              {time.toFixed(2)}
            </Text>
            <Text className="text-sm text-gray-600 font-normal">
              {formatDuration()}
            </Text>
          </View>
          <PlaybackBar
            onSeek={(seconds: number) => player.seekTo(seconds)}
            value={audioStatus.currentTime / audioStatus.duration}
            duration={audioStatus.duration}
          />

          <View className="flex-row items-center justify-between mt-4 w-full">
            <Ionicons name="play-skip-back" size={24} color="white" />
            <Ionicons name="play-back" size={24} color="white" />
            <Ionicons
              name={audioStatus.playing ? "pause" : "play"}
              size={48}
              color="white"
              onPress={() =>
                audioStatus.playing ? player.pause() : player.play()
              }
            />
            <Ionicons name="play-forward" size={24} color="white" />
            <Ionicons name="play-skip-forward" size={24} color="white" />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
