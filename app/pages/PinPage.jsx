import React, { useContext, useEffect, useState } from "react";
import drops from "../../assets/data/Drops";
import users from "../../assets/data/Users";
import secrets from "../../assets/data/Env";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../../assets/components/UserContext";

const { width: screenWidth } = Dimensions.get("window");

export default function PinPage() {
  const { userData, setUserData } = useContext(UserContext);
  const { id, ratio } = useLocalSearchParams();

    const [drivingTime, setDrivingTime] = useState(null);
  const [walkingTime, setWalkingTime] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(drop?.likeCount);

  const drop = drops.find((drop) => drop.id == id);
  const user = users.find((user) => user.id = drop.usedID);


  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / screenWidth);
    setCurrentIndex(index);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    isLiked ?   setLikeCount(drop.likeCount-1): setLikeCount(drop.likeCount + 1) ; 
  }
  const handleSave = () => {
    setIsSaved(!isSaved);
  }


  const fetchTravelTimes = async () => {
    setIsLoading(true);
    setDrivingTime(null);
    setWalkingTime(null);

    console.log("Fetching travel times...");
    const modes = ["driving", "walking"];
    const apiKey = secrets.GOOGLE_MAP_API_KEY ; // Replace with your actual API key

    if (!apiKey) {
      console.error("API Key is missing. Configure it in your .env file.");
      setIsLoading(false);
      return;
    }

    try {
      const results = await Promise.all(
        modes.map((mode) => {
          const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(userData.location)}&destination=${encodeURIComponent(drop.location)}&mode=${mode}&key=${apiKey}`;
          console.log(`Fetching ${mode} directions: ${url}`);
          return fetch(url).then((response) => response.json());
        })
      );

      const drivingResult = results[0];
      const walkingResult = results[1];


      if (drivingResult.status === "OK" && drivingResult.routes?.[0]?.legs?.[0]?.duration) {
        setDrivingTime(drivingResult.routes[0].legs[0].duration.text);
      } else {
        console.error("Driving Directions Error:", drivingResult.status, drivingResult.error_message);
      }

      if (walkingResult.status === "OK" && walkingResult.routes?.[0]?.legs?.[0]?.duration) {
        setWalkingTime(walkingResult.routes[0].legs[0].duration.text);
      } else {
        console.error("Walking Directions Error:", walkingResult.status, walkingResult.error_message);
      }
    } catch (err) {
      console.error("Error fetching directions:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchTravelTimes();
    };
    fetchData();
  }, [userData.location, drop.location]);

  return (
    <ScrollView style={{ backgroundColor: "white", margin:0, padding:0 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Pressed walk")} style={{ flexDirection: "row" }}>
          <Ionicons name="walk" size={18} color="black" style={{ marginRight: 8 }} />
          <Text style={styles.text}>{walkingTime || "_"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Pressed car")} style={{ flexDirection: "row" }}>
          <Ionicons name="car" size={18} color="black" style={{ marginRight: 8 }} />
          <Text style={styles.text}>{drivingTime || "_"}</Text>
        </TouchableOpacity>
      </View>
       <View style = {{marginLeft: (screenWidth * 0.1)/2, width: screenWidth *0.9, marginRight:0}}>
       <FlatList
       
        data={drop.images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <Image
            source={{ uri: `https://drive.google.com/uc?export=view&id=${item}` }}
            style={[styles.carouselImage, { aspectRatio: ratio }]} // Maintain aspect ratio
          />
        )}
      />
      <View style = {{flexDirection:"row", justifyContent:"flex-end", marginRight:35}}>
      <Text style={{backgroundColor:"#54545425", borderRadius: 18, padding: 4, paddingRight:6, paddingLeft:6, fontSize:12, fontFamily:  "DMSans_400Regular", marginBottom: 5}}>
         {currentIndex+1} / {drop.count}</Text>
      </View>
      </View>
      
      {/** Likes and saved row */}
      <View style = {{flexDirection: "row", justifyContent:"space-between", marginRight:40, marginLeft:40}}>
       <TouchableOpacity onPress={handleLike}>
        <View style = {{flexDirection: "row"}}>
                      <Ionicons name={isLiked ? "heart" : "heart-outline"} size= {25} color={isLiked ? "#aa1945" : "#545454"} style/>
                      <Text style={{fontSize:13, fontFamily:  "DMSans_400Regular", marginTop:6}}> {likeCount}</Text>
                      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSave}>
      <Ionicons name={isSaved ? "bookmark" : "bookmark-outline"} size= {25} color={isSaved ? "#aa1945" : "#545454"} style/>
      </TouchableOpacity>
      </View>
        <View style = {styles.owner}>
                          <Image source = {{uri: `https://drive.google.com/uc?export=view&id=${user.profileImage}`}} style = {{width: 25, height: 25, borderRadius: 50, marginTop: 3}}/>
                          <Text style = {styles.ownerText}  numberOfLines={1}>{user.name} </Text>
         </View>
         <Text style = {{fontFamily:"DMSans_700Bold",marginLeft: 40, fontSize:25, marginTop:8}}>{drop.location.split(",")[0].trim()} </Text>
        <View style={styles.locationContainer}>
                    <Ionicons name="location-outline" size={16} color="black"/>
                    <Text style={styles.locationText}>{drop.location}</Text>
        </View>
        <Text style={[styles.locationText, {marginLeft:35, marginRight:35, fontSize:14, marginBottom:15}]}>{drop.caption}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", padding: 10, justifyContent: "flex-end", marginTop: 5 },
  text: { fontSize: 16, color: "black", fontFamily: "DMSans_400Regular", marginRight: 15 },
  carouselImage: {
    width: screenWidth * 0.9, // 90% of the screen width
    borderRadius: 20,
    marginBottom: 7,
    alignSelf: "center",
    resizeMode: "cover", // Ensures the image scales properly
  },
  owner: {flexDirection: "row", alignContent: "center", marginTop:5, marginLeft: 40},
  ownerText: {color: "black", fontSize: 15, fontFamily: "DMSans_400Regular", marginTop: 5, marginLeft: 12, width: 120},
  locationContainer: { flexDirection: "row", marginLeft:35},
  locationText: { marginLeft:8, fontSize: 13, fontFamily: "DMSans_400Regular", marginBottom: 10, color: "black"},
});