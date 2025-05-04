import { AntDesign } from "@expo/vector-icons";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { FlatList, Image, Text, View } from "react-native";
import books from "../../../utils/dummyBooks";
export default function Home() {
  return (
    <View className=" flex-1 justify-center p-4 pt-10">
      <FlatList
        data={books}
        contentContainerClassName="gap-6"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row items-center gap-2">
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
              <Link href="/player" asChild>
                <AntDesign name="playcircleo" size={22} color="gainsboro" />
              </Link>
              <AntDesign name="download" size={22} color="gainsboro" />
              <AntDesign name="pluscircle" size={22} color="gainsboro" />
            </View>
          </View>
        )}
      />
      <StatusBar style="light" />
    </View>
  );
}
