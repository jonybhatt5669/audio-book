import { IBook } from "@/utils/interfaces/IBook";
import { AntDesign } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
export default function BookListItem({ book }: IBook) {
  return (
    <View className="flex-row items-center gap-2">
      <Image
        source={{ uri: book.thumbnail_url }}
        className="aspect-square w-16"
      />
      <View className="gap-1 flex-1">
        <Text className="font-bold text-gray-100  text-2xl">{book.title}</Text>
        <Text className="font-normal text-gray-400">{book.author}</Text>
      </View>
      <View className="flex-row items-center gap-4">
        <AntDesign name="playcircleo" size={22} color="gainsboro" />
        <AntDesign name="download" size={22} color="gainsboro" />
        <AntDesign name="pluscircle" size={22} color="gainsboro" />
      </View>
    </View>
  );
}
