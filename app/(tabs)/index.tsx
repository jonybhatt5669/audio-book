import { BookListItem } from "@/components";
import { StatusBar } from "expo-status-bar";
import { FlatList, View } from "react-native";
import books from "../../utils/dummyBooks";
export default function Home() {
  return (
    <View className=" flex-1 justify-center p-4 pt-10">
      <FlatList
        data={books}
        contentContainerClassName="gap-6"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BookListItem book={item} />}
      />
      <StatusBar style="auto" />
    </View>
  );
}
