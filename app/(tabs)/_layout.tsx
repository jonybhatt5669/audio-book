import { useAuth } from "@clerk/clerk-expo";
import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Tabs } from "expo-router";
import { ActivityIndicator } from "react-native";
export default function MainLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <ActivityIndicator />;
  }

  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#F4F8D3",
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library-outline" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#F4F8D3",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
          tabBarActiveTintColor: "#F4F8D3",
        }}
      />
    </Tabs>
  );
}
