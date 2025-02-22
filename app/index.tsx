import { Text, View, Pressable } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; 

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>HomePage</Text>
      <Pressable
        onPress={() => router.push("../sections/userprofile")}
        style={({ pressed }) => ({
          marginTop: 20,
          padding: 10,
          borderRadius: 10,
          backgroundColor: pressed ? "#ddd" : "#f0f0f0",
        })}
      >
        <Ionicons name="person-circle-outline" size={40} color="black" />
      </Pressable>
    </View>
  );
}
