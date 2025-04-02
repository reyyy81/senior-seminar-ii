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
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Images
const images = [
  require("../../assets/images/backpacker.png"),
  require("../../assets/images/bali.png"),
  require("../../assets/images/addPostScreen/bali 4.png"),
  require("../../assets/images/matcha.png"),
  require("../../assets/images/addPostScreen/bali 2.png"),
  require("../../assets/images/addPostScreen/bali 3.png"),
  require("../../assets/images/besideAsea.png"),
  require("../../assets/images/nailsalonpt2.png"),
  require("../../assets/images/louisiana.png"),
  require("../../assets/images/alley.png"),
  require("../../assets/images/nailsalon.png"),
];

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState("Saved");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boardName, setBoardName] = useState("");

  const savedBoards = [
    { id: "1", name: "Hiking (1 Pin)" },
    { id: "2", name: "Bali (3 Pins)" },
    { id: "3", name: "Festival (1 Pin)" },
    { id: "4", name: "NYC (3 Pins)" },
    { id: "5", name: "Costa Rica(8 Pins)" },
    { id: "6", name: "To See (15 Pins)" },
  ];

  const createdBoards = [
    {
      id: "101",
      name: "Solo Trip",
      images: [
        require("../../assets/images/addPostScreen/bali 2.png"),
        require("../../assets/images/bali.png"),
        require("../../assets/images/addPostScreen/bali 4.png"),
      ],
    },
  ];

  const openEditModal = (board) => {
    setSelectedBoard(board);
    setBoardName(board.name);
    setModalVisible(true);
  };

  const saveBoardName = () => {
    setModalVisible(false);
  };

  const deleteBoard = (id) => {
    Alert.alert("Delete Board", "Are you sure you want to delete this board?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () =>
          setBoards((prev) => prev.filter((b) => b.id !== id)),
        style: "destructive",
      },
    ]);
  };

  const renderSavedBoard = ({ item, index }) => (
    <View style={styles.boardCard}>
      <Image
        source={images[index % images.length]}
        style={styles.boardImage}
        resizeMode="cover"
      />
      <Text style={styles.boardTitle}>{item.name}</Text>
      <Text style={styles.boardSubText}>No posts yet</Text>
      <View style={styles.iconsRow}>
        <Pressable onPress={() => openEditModal(item)} style={{ marginRight: 15 }}>
          <Ionicons name="create-outline" size={20} color="#aa1945" />
        </Pressable>
        <Pressable onPress={() => deleteBoard(item.id)}>
          <Ionicons name="trash-outline" size={20} color="#aa1945" />
        </Pressable>
      </View>
    </View>
  );

  const renderCreatedBoard = ({ item }) => (
    <View style={styles.createdCard}>
      <Text style={styles.boardTitle}>{item.name}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {item.images.map((img, index) => (
          <Image
            key={index}
            source={img}
            style={styles.carouselImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      <Pressable
        style={styles.tabButton}
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
        style={styles.tabButton}
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
  );

  return (
    <View style={styles.container}>
      <FlatList
        key={activeTab === "Created" ? "created" : "saved"}
        data={activeTab === "Created" ? createdBoards : savedBoards}
        keyExtractor={(item) => item.id}
        numColumns={activeTab === "Saved" ? 2 : 1}
        renderItem={activeTab === "Created" ? renderCreatedBoard : renderSavedBoard}
        contentContainerStyle={
          activeTab === "Saved"
            ? styles.boardsContainer
            : styles.createdContainer
        }
        ListHeaderComponent={
          <>
            <View style={styles.headerContainer}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>J.S</Text>
              </View>
              <Text style={styles.userName}>John Smith</Text>
              <Text style={styles.userStats}>0 followers • 0 following</Text>
              <Pressable style={styles.editProfileButton}>
                <Text style={styles.editProfileButtonText}>Edit profile</Text>
              </Pressable>
            </View>
            {renderTabs()}
            {activeTab === "Created" && createdBoards.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No drops yet, but there's tons of potential
                </Text>
              </View>
            )}
          </>
        }
      />

      {/* Modal */}
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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerContainer: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#fff",
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
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  tabButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  tabButtonText: {
    fontSize: 16,
    color: "#c5ced6",
    fontFamily: "DMSans_400Regular",
  },
  activeTabText: {
    color: "#000",
    fontFamily: "DMSans_700Bold",
  },
  boardsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  createdContainer: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  boardCard: {
    backgroundColor: "#eaeaea",
    borderRadius: 15,
    margin: 5,
    flex: 1,
    minHeight: 200,
    padding: 10,
    justifyContent: "space-between",
  },
  boardImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  boardTitle: {
    fontSize: 15,
    fontFamily: "DMSans_700Bold",
    color: "#000",
  },
  boardSubText: {
    color: "#444",
    fontSize: 12,
    marginVertical: 6,
    fontFamily: "DMSans_400Regular",
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  createdCard: {
    backgroundColor: "#eaeaea",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
  },
  carouselImage: {
    width: 200,
    height: 130,
    borderRadius: 10,
    marginRight: 10,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#444",
    fontWeight: "bold",
    fontFamily: "DMSans_400Regular",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
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
    backgroundColor: "#aa1945",
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});