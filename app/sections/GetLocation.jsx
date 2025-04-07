import React, { useCallback, useRef, useState, useContext } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import secrets from "../../assets/data/Env";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { UserContext } from "../../assets/components/UserContext";


export default function SelectInterests() {
    const { userData, setUserData } = useContext(UserContext);
    const bottomSheetModalRef = useRef(null);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
    const [location, setLocation] = useState("Enter your location ");

    const handleLocationSelect = (location) => {
      setUserData((prev) => ({ ...prev, location })); // Update location in context
      console.log("Updated User Data:", userData);
    };
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
    setIsBottomSheetOpen(index >= 0);
  }, []);

   const uploadUseraData = () => {
    // TODO: Upload user data to database.
     handleLocationSelect(location);
     console.log(userData);
     router.push("/(tabs)/FypScreen");
   }

  // renders
  return (

      <GestureHandlerRootView style ={styles.container}>
            {isBottomSheetOpen && <View style={styles.overlay} />}
            <Text style = {{fontSize:15, fontFamily: "DMSans_400Regular", marginBottom: 20, color:"grey"}}>Providing your location helps us to tailor your content and provide the best service.</Text>

        <View style = {{alignItems:"center"}}>
         <Image source={{uri : "https://drive.google.com/uc?export=view&id=1DQ0W8UO6Yu9jJ8Be7aWU1dnZcJ51I14-"}} style={{height: 400, width: "90%", borderRadius:20, marginBottom:30}}/>
         </View>
        <BottomSheetModalProvider>
        <View style = {{alignItems:"center", marginTop:20}}>

        <Pressable
          onPress={handlePresentModalPress}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "white",
            borderColor: "grey",
            borderWidth:1,
            paddingHorizontal:20,
            borderRadius: 12,
            width: "90%",
            height:40,
          }}
        >
          <Text style={{ color: "black", fontSize: 14, width: 270}} numberOfLines={1} ellipsizeMode='tail'>{location}</Text>
          <Ionicons name="chevron-down" size={16} color="black" />
        </Pressable>
        </View>
        { location !== "Enter your location" && 
           <TouchableOpacity style= {{marginTop:40, marginRight:20}} onPress={uploadUseraData}>
                <Ionicons name="chevron-forward-circle" size= {45} color="#aa1945" style={{alignSelf:"flex-end"}}/>
           </TouchableOpacity>
           }
          <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
            snapPoints={["60%"]}
          >
            <BottomSheetView style={styles.contentContainer}>
                
                <GooglePlacesAutocomplete
                placeholder='Enter an address, zipcode, or neighbourhood'
                onPress = {(data, details = null ) => {
                        setLocation(data.description); 
                        console.log(data, "\n", details);
                }}
                query = {{
                    key:secrets.GOOGLE_MAP_API_KEY,
                    language:"en",
                }}
                styles = {{
                    textInput: styles.textInput,
                    container: {width: "80%", }

                }}
                />
            </BottomSheetView>
        </BottomSheetModal>
        </BottomSheetModalProvider>


    </GestureHandlerRootView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  contentContainer: {
    width:"100%",
    height:"100%",
    flex:1,
    backgroundColor:"white",
    alignItems: "center",
  },
  textInput: {
    borderColor:"grey",
    backgroundColor:"white",
    borderWidth: 1,
    color:"black",
    borderRadius:12,
    marginTop: 20,

  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
  },
});