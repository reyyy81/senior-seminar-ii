import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function RootLayout() {
  return (
    <Tabs
      // Global options for all tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          height: "8%",
          paddingLeft: 18,
          paddingRight: 18,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 5,
        },
        // If you want to hide labels at some point in any screen:
        // tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="FypScreen"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={27}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="SearchScreen"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={color}
              size={27}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="AddPostScreen"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
              size={27}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="SavedScreen"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              color={color}
              size={27}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={27}
            />
          ),
        }}
      />
    </Tabs>
  );
}
