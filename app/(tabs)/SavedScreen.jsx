import React, {useCallback, useState} from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback, FlatList, ScrollView, Modal, TextInput,
  Pressable
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import drops from "../../assets/data/Drops";
import users from "../../assets/data/Users";
import { CollectionPin } from "../../assets/components/CollectionPin";
import { DropsLayout } from "../../assets/components/DropsLayout";
import { DropdownMenu } from "../../assets/components/DropdownMenu";
import { MenuOption } from "../../assets/components/MenuOption";
import { router } from "expo-router";

export default function SavedScreen() {
  const [showCollections, setShowCollections] = useState(true);
  const [addItem, setAddItem] = useState(false);
  const [createCollectionVisible, setCreateCollectionVisible] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  const createDummyCollectionPins = () => {
    const collectionNames = ["Best Brunch Spots in NYC", "Best Coffee Shops Ever", "Places I've seen in dreams", "Best College Bars in DC"];
    const originalCollections = users.map((u, index) => {
      return {
        id: `${u.id}-${index}`,
        user: u.name,
        userImage: u.profileImage,
        image: drops[index].primaryImage,
        name: collectionNames[index],
      };
    });
    const duplicatedCollections = originalCollections.map((item, index) => ({ ...item, id: `${item.id}-copy-${index}` }));
    return originalCollections.concat(duplicatedCollections);
  }

  const collections = createDummyCollectionPins();
  const renderCollectionPin = ({ item }) => (
    <View style={styles.pinContainer}>
        <CollectionPin pin={{...item, hgt: 200, wdth: '100%'}} />
    </View>
  );
  const keyExtractor = (item) => item.id;

  const addDrop = () => {
    router.push("/(tabs)/AddPostScreen");
  };

  const saveCollectionName = () => {
    console.log("Collection Name", collectionName);
    setCreateCollectionVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style = {styles.header}>
        <TouchableNativeFeedback onPress={() => setShowCollections(false)}>
          <Text style={[styles.text, !showCollections && styles.boldText, {marginLeft: 35}]}>Drops</Text>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback onPress={() => setShowCollections(true)}>
          <Text style={[styles.text, showCollections && styles.boldText]}>Collections</Text>
        </TouchableNativeFeedback>
        <DropdownMenu visible={addItem} handleOpen={() => setAddItem(true)} handleClose={() => setAddItem(false)}
        trigger = {  <Ionicons name="add" size={24} style= {{marginRight: 10}}/>} >
          <MenuOption onSelect={() => {
            setAddItem(false);
            setCreateCollectionVisible(true);
          }}>
            <Text style={styles.dropText}>Add Collection</Text>
          </MenuOption>
          <MenuOption onSelect={() => {
            setAddItem(false);
            addDrop();
          }}>
            <Text style={styles.dropText}>Add Drop</Text>
          </MenuOption>
        </DropdownMenu>
        </View>
        
        { showCollections && (
            <FlatList
            data={collections}
            renderItem={renderCollectionPin}
            keyExtractor={keyExtractor}
            numColumns={2}
            style={styles.listStyle} 
            contentContainerStyle={styles.listContentContainer} 
        /> )}
        {
        !showCollections && (
          <ScrollView>
            <DropsLayout drops = {drops} />
          </ScrollView>
        )
           }

  {/* Modal */}
        <Modal visible={createCollectionVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter Board Name</Text>
              <TextInput
                value={collectionName}
                onChangeText={setCollectionName}
                style={styles.modalTextInput}
              />
              <Pressable onPress={saveCollectionName} style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white"},
  header: { backgroundColor: "white", flexDirection: "row", justifyContent:"space-between", padding: 20, alignItems: "center"},
  text: { fontSize: 16, fontWeight: "normal", color: "#c5ced6", fontFamily: "DMSans_400Regular"},
  dropText: {fontSize: 16,  fontWeight: "normal", color: "black", fontFamily: "DMSans_400Regular"},
  boldText: { color: "black", fontFamily: "DMSans_700Bold"},
  pinContainer: { flex: 1 / 2, padding: 5},
  collectionLayout: { backgroundColor:"white", padding: 10, flexDirection:"row", justifyContent: "space-between"},
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center"},
  modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 10, width: "80%"},
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10},
  modalTextInput: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, marginBottom: 10 },
  saveButton: { paddingVertical: 10, backgroundColor: "#aa1945", borderRadius: 10, alignItems: "center"},
  saveButtonText: { color: "#fff", fontWeight: "bold"},
});
