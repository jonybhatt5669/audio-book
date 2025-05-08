import { usePlayer } from "@/providers/PlayerProvider";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import books from "../../utils/dummyBooks";
export default function Home() {
  const { setBook } = usePlayer();
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  // Extract unique genres
  const genres = useMemo(() => {
    const genreSet = new Set<string>();
    books.forEach((book) => book.genre.forEach((g) => genreSet.add(g)));
    return Array.from(genreSet);
  }, []);

  // Filtered book list
  const filteredBooks = selectedGenre
    ? books.filter((book) => book.genre.includes(selectedGenre))
    : books;
  return (
    <SafeAreaView className={` flex-1 p-4`}>
      <View>
        <Text className="my-4 font-semibold text-2xl text-white">
          Select Genre
        </Text>
        <FlatList
          data={genres}
          horizontal
          showsHorizontalScrollIndicator={false}
          className="gap-4"
          contentContainerStyle={{
            gap: 10,
          }}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                setSelectedGenre(selectedGenre === item ? null : item)
              }
              className={`px-4 py-2 rounded-full border border-gray-600 ${
                selectedGenre === item ? "bg-emerald-400" : "bg-slate-800"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  selectedGenre === item ? "text-gray-800" : "text-gray-50"
                }`}
              >
                {item}
              </Text>
            </Pressable>
          )}
        />
      </View>
      <View className="mt-8 flex-1">
        <FlatList
          data={filteredBooks}
          contentContainerClassName="gap-6"
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setBook(item);
                router.push("/player");
              }}
              className="flex-row items-center gap-2 "
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
                <AntDesign name="playcircleo" size={22} color="gainsboro" />
                <AntDesign name="download" size={22} color="gainsboro" />
              </View>
            </Pressable>
          )}
        />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
