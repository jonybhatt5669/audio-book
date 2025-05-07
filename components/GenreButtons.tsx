import { FlatList, Pressable, Text } from "react-native";
interface Props {
  setSelectedGenre: (value: string | null) => void;
  genre: string[];
  selectedGenre: string | null;
}
export default function GenreButtons({
  setSelectedGenre,
  genre,
  selectedGenre,
}: Props) {
  return (
    <FlatList
      data={genre}
      horizontal
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => setSelectedGenre(selectedGenre === item ? null : item)}
          className={`px-4 py-2 rounded-full ${
            selectedGenre === item ? "bg-emerald-400" : "bg-gray-400"
          }`}
        >
          <Text
            className={`text-sm ${
              selectedGenre === item ? "text-white" : "text-gray-500"
            }`}
          >
            {item}
          </Text>
        </Pressable>
      )}
    />
  );
}
