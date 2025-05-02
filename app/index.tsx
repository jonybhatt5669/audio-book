import { BookListItem } from "@/components";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import books from "../utils/dummyBooks";
export default function Index() {
  const book = books[0];
  return (
    <>
      <View className="bg-slate-800 flex-1 justify-center p-4">
        <StatusBar style="auto" />
        <BookListItem book={book} />
      </View>
    </>
  );
}
