import FloatingPlayer from "@/components/FloatingPlayer";
import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
export default function MainLayout() {
  return (
    <Tabs
      tabBar={(props) => (
        <>
          <FloatingPlayer />
          <BottomTabBar {...props} />
        </>
      )}
    >
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
          title: "Downloaded",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="download-outline" size={size} color={color} />
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
