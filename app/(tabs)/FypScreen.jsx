import { Ionicons } from '@expo/vector-icons';
import  {DropsLayout}  from '../../assets/components/DropsLayout';
import {React, useState} from "react";
import drops from "../../assets/data/Drops";
import users from "../../assets/data/Users";
import { ScrollView, View, StyleSheet, Text, TouchableNativeFeedback} from "react-native";
import {CollectionPin} from "../../assets/components/CollectionPin";

const createDummyCollectionPins = () => {
  const collectionNames = ["Best Brunch Spots in NYC", "Best Coffee Shops Ever", "Places I've seen in dreams", "Best College Bars in DC"];
  return users.map((u, index) => {
    return {user: u.name, userImage: u.profileImage, image: drops[index].primaryImage, name: collectionNames[index]};
  });
}

export default function FypScreen() {

    const [explore, setExplore] = useState(true);
    const changePage = (page) => {
      setExplore(page);
  }
  const collectionPins = createDummyCollectionPins();

  return (
  <ScrollView>
    <View style = {styles.header}>
      <TouchableNativeFeedback onPress={() => changePage(false)}>
      <Text style={[styles.text, !explore && styles.boldText, {marginLeft: 25}]}>Following</Text>
      </TouchableNativeFeedback>
      <TouchableNativeFeedback onPress={() => changePage(true)}>
      <Text style={[styles.text, explore && styles.boldText,  {marginLeft:110}]}>Explore</Text>
      </TouchableNativeFeedback>
      { /* TODO:  ADD ON TAP, open notifications page */}
      <Ionicons name="notifications-outline" size={24} color="black" style = {{marginLeft:30, zIndex: 1}}/>
      {/* TODO: Only show the red dot when there are notifications */}
      <Ionicons name="ellipse" size= {10} color="#aa1945" style = {{position: "absolute", top: 14, right: explore ? -5 : -5.5, marginRight: 45, opacity: 1, zIndex: 2}}/>
    </View>

    <View style= {{padding: 5, backgroundColor: "white"}}>
    { /* TODO:  ADD ON TAP, open recommended lists page */}
      <View style = {{flexDirection: "row", alignItems: "center"}}>
      <Text style = {{fontSize: 22, color: "black", fontFamily: "DMSans_700Bold", marginLeft: 25}}>Recommended lists </Text>
      <Ionicons name="chevron-forward-sharp" size={24} color="#aa1945" style = {{marginLeft: 30}}/>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style = {{padding:10}}>
        {collectionPins.map((collection, index) => (
        <CollectionPin pin = {collection} key = {index} />
        ))}
      </ScrollView>
    </View>
    <DropsLayout drops = {drops} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { backgroundColor: "white", flexDirection: "row", padding: 10, alignItems: "center"},
  text: { fontSize: 24, fontWeight: "normal", color: "#c5ced6", fontFamily: "DMSans_400Regular"},
  boldText: { color: "black", fontFamily: "DMSans_700Bold"},

  collectionPin: {width: 170, height: 160, flex:1, backgroundColor: "#eaeaea", borderRadius: 15, marginRight: 10}
  
});
