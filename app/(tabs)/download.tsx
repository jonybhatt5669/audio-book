import { IDownloadedFile } from "@/utils/interfaces/IDownloadedFile";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
export default function Download() {
  const [downloadedFiles, setDownloadedFiles] = useState<
    IDownloadedFile[] | []
  >([]);

  useEffect(() => {
    loadDownloadedFiles();
  }, []);

  const loadDownloadedFiles = async () => {
    try {
      const storedFiles = await AsyncStorage.getItem("downloadedFiles");
      if (storedFiles) {
        setDownloadedFiles(JSON.parse(storedFiles));
      }
    } catch (error) {
      console.error("Error loading downloaded files:", error);
    }
  };

  // Delete a downloaded file
  const deleteFile = async (file: IDownloadedFile) => {
    try {
      await FileSystem.deleteAsync(file.fileUri);
      const updatedFiles = downloadedFiles.filter((f) => f.id !== file.id);
      setDownloadedFiles(updatedFiles);
      await AsyncStorage.setItem(
        "downloadedFiles",
        JSON.stringify(updatedFiles)
      );
      Alert.alert("Success", `${file.title} has been deleted.`);
    } catch (error) {
      console.error("Delete error:", error);
      Alert.alert("Error", "Failed to delete the file.");
    }
  };

  const renderBooks = ({ item }: { item: IDownloadedFile }) => (
    <View className="flex-row items-center gap-2 mt-4">
      <View className="gap-1 flex-1">
        <Text className="font-bold text-gray-100  text-2xl line-clamp-1">
          {item.title}
        </Text>
        <Text className="font-normal text-gray-400">{item.author}</Text>
      </View>
      <View className="flex-row items-center gap-4">
        <AntDesign
          name="delete"
          size={22}
          color="red"
          onPress={() => deleteFile(item)}
        />
      </View>
    </View>
  );

  return (
    <View className="flex-1 p-6 justify-center">
      {downloadedFiles.length === 0 ? (
        <>
          <Text className="text-2xl text-center text-gray-200">
            No downloaded files
          </Text>
        </>
      ) : (
        <>
          <FlatList
            data={downloadedFiles}
            renderItem={renderBooks}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </View>
  );
}
