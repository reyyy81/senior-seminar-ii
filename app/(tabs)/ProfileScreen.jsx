import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { PostContext } from "../../assets/components/PostContext";
import { UserContext } from "../../assets/components/UserContext";

export default function ProfileScreen() {
  const { createdPosts, deletePost } = useContext(PostContext);
  const { userData } = useContext(UserContext);
  const { tab } = useLocalSearchParams();

  const flattenedImages = createdPosts.flatMap((post) =>
    post.images.map((img, index) => ({
      uri: img,
      id: `${post.id}-${index}`,
      postId: post.id,
      fullPost: post,
    }))
  );

  const handleImagePress = (post) => {
    router.push({
      pathname: "/pages/PinPage",
      params: {
        images: JSON.stringify(post.images),
        location: post.location,
        description: post.description,
        tags: post.tags,
        ratio: "1",
        ownerName: userData?.name || "You",
        ownerImage: userData?.image || "",
      },
    });
  };

  const renderGridImage = ({ item }) => (
    <Pressable
      onPress={() => handleImagePress(item.fullPost)}
      style={styles.gridItem}
    >
      <Image source={{ uri: item.uri }} style={styles.gridImage} />
      <Pressable
        style={styles.trashIcon}
        onPress={() => deletePost(item.postId)}
      >
        <Ionicons name="trash-outline" size={16} color="white" />
      </Pressable>
    </Pressable>
  );

  if (flattenedImages.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          {userData?.image ? (
            <Image source={{ uri: userData.image }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>
                {userData?.name?.charAt(0).toUpperCase() || "U"}
              </Text>
            </View>
          )}
          <Text style={styles.userName}>{userData?.name || "Unnamed User"}</Text>
          <Text style={styles.userStats}>0 followers • 0 following</Text>
          <Pressable style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>Edit profile</Text>
          </Pressable>
        </View>
        <Text style={styles.sectionTitle}>Created</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No drops yet, but there's tons of potential
          </Text>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={flattenedImages}
      renderItem={renderGridImage}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.gridContainer}
      ListHeaderComponent={
        <>
          <View style={styles.headerContainer}>
            {userData?.image ? (
              <Image source={{ uri: userData.image }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>
                  {userData?.name?.charAt(0).toUpperCase() || "U"}
                </Text>
              </View>
            )}
            <Text style={styles.userName}>{userData?.name || "Unnamed User"}</Text>
            <Text style={styles.userStats}>0 followers • 0 following</Text>
            <Pressable style={styles.editProfileButton}>
              <Text style={styles.editProfileButtonText}>Edit profile</Text>
            </Pressable>
          </View>
          <Text style={styles.sectionTitle}>Created</Text>
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eaeaea",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 36,
    color: "#000",
    fontFamily: "DMSans_700Bold",
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 20,
    color: "#000",
    fontFamily: "DMSans_700Bold",
    marginBottom: 5,
  },
  userStats: {
    color: "#444",
    fontFamily: "DMSans_400Regular",
    marginBottom: 15,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: "#aa1945",
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  editProfileButtonText: {
    color: "#aa1945",
    fontWeight: "bold",
    fontFamily: "DMSans_700Bold",
  },
  sectionTitle: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "DMSans_700Bold",
    marginBottom: 10,
  },
  gridContainer: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  gridItem: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  gridImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 12,
  },
  trashIcon: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 6,
    borderRadius: 20,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#444",
    fontFamily: "DMSans_400Regular",
    textAlign: "center",
  },
});
