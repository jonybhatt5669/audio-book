import dummyBooks from "@/utils/dummyBooks";
import { Ionicons } from "@expo/vector-icons";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Player() {
  const book = dummyBooks[0];
  return (
    <SafeAreaView className="flex-1 items-center py-8 px-6">
      <Image
        source={{ uri: book.thumbnail_url }}
        className="w-[95%] aspect-square rounded-3xl object-contain self-center"
      />
      <View className="flex-row items-center justify-between mt-8 w-full">
        <Ionicons name="play-skip-back" size={24} color="white" />
        <Ionicons name="play-back" size={24} color="white" />
        <Ionicons name="play" size={48} color="white" />
        <Ionicons name="play-forward" size={24} color="white" />
        <Ionicons name="play-skip-forward" size={24} color="white" />
      </View>
    </SafeAreaView>
  );
}
