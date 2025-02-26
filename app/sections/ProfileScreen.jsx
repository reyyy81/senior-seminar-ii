import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  TextInput,
  Modal,
  Alert,
  StyleSheet,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const [boards, setBoards] = useState([
    { id: "1", name: "Hiking (0 Pin)" },
    { id: "2", name: " Cafes (0 Pin)" },
    { id: "3", name: "Vietnam (0 Pin)" },
    { id: "4", name: "NYC (0 Pin)" },
    { id: "5", name: "Matcha (0 Pin)" },
    { id: "6", name: "Date night (0 Pin)" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boardName, setBoardName] = useState("");

  // For toggling between 'Created' and 'Saved' tabs
  const [activeTab, setActiveTab] = useState("Saved"); // default to 'Saved'

  // Open Edit Modal
  const openEditModal = (board) => {
    setSelectedBoard(board);
    setBoardName(board.name);
    setModalVisible(true);
  };

  // Save Edited Board Name
  const saveBoardName = () => {
    setBoards(
      boards.map((b) =>
        b.id === selectedBoard.id ? { ...b, name: boardName } : b
      )
    );
    setModalVisible(false);
  };

  // Delete Board with Confirmation
  const deleteBoard = (id) => {
    Alert.alert("Delete Board", "Are you sure you want to delete this board?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => setBoards(boards.filter((b) => b.id !== id)),
        style: "destructive",
      },
    ]);
  };

  const createdBoards = []; // Simulating empty created boards

  return (
    // if it says virtualized lists should never be nested inside plain scrollviews as an error, then remove this.
    <ScrollView style={styles.container}>
    <View style={styles.container}>
      {/* Top section (avatar, name, followers/following, edit profile) */}
      <View style={styles.headerContainer}>
        {/* Instead of an image, show a large letter in a circle */}
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>J.S</Text>
        </View>

        <Text style={styles.userName}>John Smith</Text>
        <Text style={styles.userStats}>0 followers • 0 following</Text>

        <Pressable style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Edit profile</Text>
        </Pressable>
      </View>

      {/* Tabs row: Created | Saved */}
      <View style={styles.tabsContainer}>
        <Pressable
          style={[styles.tabButton, activeTab === "Created" && styles.activeTab]}
          onPress={() => setActiveTab("Created")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Created" && styles.activeTabText,
            ]}
          >
            Created
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tabButton, activeTab === "Saved" && styles.activeTab]}
          onPress={() => setActiveTab("Saved")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "Saved" && styles.activeTabText,
            ]}
          >
            Saved
          </Text>
        </Pressable>
      </View>

      {/* Boards/Pin Grid */}
      {activeTab === "Created" && createdBoards.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No drops yet, but there's tons of potential</Text>
        </View>
      ) : (
      <FlatList
      nestedScrollEnabled
        data={boards}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.boardsContainer}
        renderItem={({ item }) => (
          <View style={styles.boardCard}>
            {/* Board Name */}
            <Text style={styles.boardTitle}>{item.name}</Text>
            {/* Example text or sub-info */}
            <Text style={styles.boardSubText}>No posts yet</Text>

            {/* Edit & Delete Icons */}
            <View style={styles.iconsRow}>
              <Pressable
                onPress={() => openEditModal(item)}
                style={{ marginRight: 15 }}
              >
                <Ionicons name="create-outline" size={22} color="#E60067" />
              </Pressable>
              <Pressable onPress={() => deleteBoard(item.id)}>
                <Ionicons name="trash-outline" size={22} color="red" />
              </Pressable>
            </View>
          </View>
        )}
      />
      )}

      {/* Edit Board Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Board Name</Text>
            <TextInput
              value={boardName}
              onChangeText={setBoardName}
              style={styles.modalTextInput}
            />
            <Pressable onPress={saveBoardName} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
     </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    backgroundColor: "black",
    alignItems: "center",
    paddingVertical: 30,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2f2f2f",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
  },
  userName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userStats: {
    color: "#fff",
    marginBottom: 15,
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  editProfileButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
  },
  tabButtonText: {
    color: "#555",
    fontWeight: "600",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
  },
  activeTabText: {
    color: "black",
  },
  boardsContainer: {
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 30,
  },
  boardCard: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    margin: 5,
    flex: 1,
    minHeight: 150,
    padding: 10,
    justifyContent: "space-between",
  },
  boardTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
  },
  boardSubText: {
    color: "gray",
    fontSize: 12,
    marginBottom: 10,
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalTextInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButton: {
    paddingVertical: 10,
    backgroundColor: "#E60067",
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
  },
  emptyText: {
    color: "Black",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});