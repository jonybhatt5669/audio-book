import { usePlayer } from "@/providers/PlayerProvider";
import { IBook } from "@/utils/interfaces/IBook";
import { IDownloadedFile } from "@/utils/interfaces/IDownloadedFile";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import books from "../../utils/dummyBooks";
export default function Home() {
  const { setBook } = usePlayer();
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [downloadedFile, setDownloadedFile] = useState<IDownloadedFile[] | []>(
    []
  );

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

  useEffect(() => {
    loadDownloadFiles();
  }, []);

  //Load  Download file
  const loadDownloadFiles = async () => {
    try {
      const storeFiles = await AsyncStorage.getItem("downloadedFiles");
      if (storeFiles) {
        setDownloadedFile(JSON.parse(storeFiles));
      } else {
        setDownloadedFile([]);
      }
    } catch (error) {
      console.log("Error loading downloaded files:", error);
    }
  };

  // Request storage permission and download the audio file
  const downloadFile = async (file: IBook) => {
    const { status } = await Permissions.askAsync(
      Permissions.MEDIA_LIBRARY_WRITE_ONLY
    );
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Storage permission is required to download files."
      );
      return;
    }
    const fileUri = `${FileSystem.documentDirectory}${
      file.id
    }_${file.title.replace(/[^a-zA-Z0-9]/g, "_")}.mp3`;

    try {
      await FileSystem.downloadAsync(file.download, fileUri);
      const newFile: IDownloadedFile = {
        id: file.id,
        title: file.title,
        fileUri,
      };
      const updateFiles = [...downloadedFile, newFile];
      setDownloadedFile(updateFiles);
      await AsyncStorage.setItem(
        "downloadedFiles",
        JSON.stringify(updateFiles)
      );
      Alert.alert("Success, ", `${file.title} has been downloaded`);
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Error", "Failed to download the file.");
    }
  };
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
          renderItem={({ item }) => {
            return (
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
            );
          }}
        />
      </View>
      <View className="mt-8 flex-1">
        <FlatList
          data={filteredBooks}
          contentContainerClassName="gap-6"
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            const isDownloaded = downloadedFile.some(
              (file) => file.id === item.id
            );
            return (
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
                  <Text className="font-bold text-gray-100  text-2xl line-clamp-1">
                    {item.title}
                  </Text>
                  <Text className="font-normal text-gray-400">
                    {item.author}
                  </Text>
                </View>
                <View className="flex-row items-center gap-4">
                  <AntDesign name="playcircleo" size={22} color="gainsboro" />
                  {!isDownloaded && (
                    <AntDesign
                      name="download"
                      size={22}
                      color="gainsboro"
                      onPress={() => downloadFile(item)}
                    />
                  )}
                </View>
              </Pressable>
            );
          }}
        />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}
