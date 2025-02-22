import { View, Text, Image, Pressable, FlatList, TextInput, Modal, Alert } from "react-native";
import { useState } from "react";
import userImage from "./imgs/user_image.png";
import { Ionicons } from "@expo/vector-icons"; // Import Icons



export default function UserProfile() {
  const [boards, setBoards] = useState([
    { id: "1", name: "Saved Places" },
    { id: "2", name: "Hiking Spots" },
    { id: "3", name: "Food & Cafes" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boardName, setBoardName] = useState("");

  // Open Edit Modal
  const openEditModal = (board) => {
    setSelectedBoard(board);
    setBoardName(board.name);
    setModalVisible(true);
  };

  // Save Edited Board Name
  const saveBoardName = () => {
    setBoards(boards.map((b) => (b.id === selectedBoard.id ? { ...b, name: boardName } : b)));
    setModalVisible(false);
  };

  // Delete Board with Confirmation
  const deleteBoard = (id) => {
    Alert.alert("Delete Board", "Are you sure you want to delete this board?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", onPress: () => setBoards(boards.filter((b) => b.id !== id)), style: "destructive" },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20, alignItems: "center" }}>
      {/* User Info Section */}
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Image
          source={userImage}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Username</Text>

        {/* Edit Profile Button */}
        <Pressable
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 20,
            backgroundColor: "black",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Edit Profile</Text>
        </Pressable>
      </View>

      {/* Boards Section */}
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Boards</Text>
      <FlatList
        data={boards}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#f0f0f0",
              borderRadius: 10,
              marginBottom: 15,
              width: "160",
              height: "160",
              marginHorizontal: 10, // Space between columns
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
            <Text style={{ color: "gray", fontSize: 12 }}>No posts yet</Text>


            {/* Edit & Delete Buttons */}
            <View style={{ flexDirection: "row", justifyContent: "bottom"}}>
              <Pressable onPress={() => openEditModal(item)} style={{ marginRight: 10, marginLeft:10 }}>
               <Ionicons name="create-outline" size={22} color="#E60067" />
              </Pressable>
              <Pressable onPress={() => deleteBoard(item.id)}>
                <Ionicons name="trash-outline" size={22} color="red" />
              </Pressable>
            </View>
          </View>
        )}
      />

      {/* Edit Board Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: "80%" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Edit Board Name</Text>
            <TextInput
              value={boardName}
              onChangeText={setBoardName}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                padding: 10,
                borderRadius: 5,
                marginBottom: 10,
              }}
            />
            <Pressable
              onPress={saveBoardName}
              style={{
                paddingVertical: 10,
                backgroundColor: "#E60067",
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
