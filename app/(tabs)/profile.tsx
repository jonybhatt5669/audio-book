import { useAuth } from "@clerk/clerk-expo";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Profile() {
  const { signOut } = useAuth();
  return (
    <SafeAreaView className="flex-1">
      <Text>Profile</Text>
      <TouchableOpacity
        className="w-full bg-emerald-400 p-4 rounded-lg mt-6"
        onPress={() => signOut()}
      >
        <Text className="text-white text-center font-semibold">Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
