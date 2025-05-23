import {Image, ImageBackground, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import { router } from "expo-router";
import React from "react";

export function CollectionPin(props) {
    const picFormat = "https://drive.google.com/uc?export=view&id="; // add image id to this format
    const {user, name, image, userImage, id,  hgt =160, wdth =170} = props.pin;

    const handlePress = () => {
        router.navigate({pathname: "/pages/CollectionPage", params:{id: id, name:name}}); // Navigate to PinPage and pass the pin data
      };

      
    return(
                  <TouchableOpacity onPress={handlePress} style={[styles.collectionPin, {height: hgt, width: wdth}]}>
                  <View style= {{flex: 1, borderTopLeftRadius: 15, borderTopRightRadius:15}}>
                  <ImageBackground source ={{uri: picFormat+ image}} style = {{flex:1}} resizeMode='cover' imageStyle = {{  borderTopLeftRadius: 15, borderTopRightRadius:15}} />
                  <View style = {styles.overlay}>
                    {/* TODO: Figure out data passing */}
                    <Text style = {{color: "white", fontSize: 16, fontFamily: "DMSans_500Medium"}}> {name}</Text>
                  </View>
                  </View>
                  <View style = {styles.owner}>
                    <Image source = {{uri: picFormat+ userImage}} style = {{width: 25, height: 25, borderRadius: 50, marginTop: 3}}/>
                    <Text style = {styles.ownerText}  numberOfLines={1}>{user} </Text>
                </View>
               </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    collectionPin: {backgroundColor: "#eaeaea", borderRadius: 15, marginRight: 10},
    overlay: {position: "absolute", bottom: 0, left: 0, right: 0, height: "100%", backgroundColor: "#54545470", borderTopLeftRadius: 15, borderTopRightRadius:15,  alignContent: "center", justifyContent: "center", padding:10},
    owner: {flexDirection: "row", alignContent: "center", height: "20%", borderBottomLeftRadius: 15, borderBottomRightRadius:15, backgroundColor:"white", marginLeft:3, marginRight:3, marginBottom: 3, alignContent: "center", justifyContent: "center"},
    ownerText: {color: "black", fontSize: 15, fontFamily: "DMSans_400Regular", marginTop: 5, marginLeft: 5, width: 120}
});