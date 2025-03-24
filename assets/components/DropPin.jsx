import { Ionicons } from "@expo/vector-icons";
import { React, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image} from "react-native";

const picFormat = "https://drive.google.com/uc?export=view&id="; // add image id to this format

export function DropPin(props) {
  const {primaryImage, location, count, secondaryImage = null} = props.pin;
  
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    Image.getSize(picFormat+ primaryImage, (width, height) => setRatio(width/height));
  }, [primaryImage]);
  if (count === 1) {
    return (
    
         <View style={styles.drop}>
              <Image source={{uri : picFormat+ primaryImage}} style={[styles.primary, {aspectRatio: ratio}]}/>
              <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={14} color="black"/>
              <Text style={styles.text}>{location}</Text>
              </View>
        </View>
    );}
    else {
    return (
      
        <View style={styles.drop}>
            <Image source={{uri : picFormat+ primaryImage}} style={[styles.primaryTop, {aspectRatio: ratio}]}/>
            <Image source={{uri : picFormat+ secondaryImage}} style={[styles.secondary, {aspectRatio: ratio}]}/>
            <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color="black"/>
            <Text style={styles.text}>{location}</Text>
            </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  drop: {width:"100%", position:"relative", marginBottom: 10},
  locationContainer: { flexDirection: "row"},
  text: { marginLeft:2, fontSize: 12, fontFamily: "DMSans_400Regular",  width: 200, marginBottom: 10, color: "black"},
  primary: { borderRadius: 8, marginBottom: 10, width: "100%", position:"relative", zIndex: 2},
  primaryTop: { borderRadius: 8, marginBottom: 10, width: "100%", position:"relative", zIndex: 2},

  secondary: { borderRadius: 8, marginBottom: 10, width: "100%", position:"absolute", transform: [{ rotate: "3.5deg" }], zIndex: 1},
});