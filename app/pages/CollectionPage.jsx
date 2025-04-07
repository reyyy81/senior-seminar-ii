import { useLocalSearchParams } from "expo-router";
import React, {useState, useEffect} from "react";
import {ScrollView, Text, View, Switch, StyleSheet, TouchableOpacity} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import secrets from "../../assets/data/Env";
import drops from "../../assets/data/Drops";
import MapView, {Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { DropsLayout } from "../../assets/components/DropsLayout";

export default function CollectionPage() {
    const{ id, name } = useLocalSearchParams();
    const [showMaps, setShowMaps] = useState(false)
    const [geometry, setGeometry] = useState([]);

    const toggleSwitch = () => { 
        setShowMaps(previousState => !previousState); 
    };

    const fetchTravelGeometry = async () => {
        console.log("Fetching travel times...");
        const apiKey = secrets.GOOGLE_MAP_API_KEY ; // Replace with your actual API key

        if (!apiKey) {
            console.error("API Key is missing. Configure it in your .env file.");
            setIsLoading(false);
            return;
        }

        try {
            const results = await Promise.all(
            drops.map((drop) => {
                const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(drop.location)}&fields=geometry&key=${apiKey}`;
                console.log(`Fetching drop id ${drop.id} directions: ${url}`);
                return fetch(url).then((response) => response.json());
            })
            );

            const allGeometry = results.map((result) => {
                if (result.status === "OK") {
                    return result.results[0].geometry.location;
                } else {
                    console.error("Error fetching geometry:", result.status);
                    return null;
                }
            });
            setGeometry(allGeometry);

        } catch (err) {
            console.error("Error fetching directions:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const renderMarkers = () => {
        return drops.map((drop, index) => {
            const coordinates = geometry[index];
            return (
                <Marker
                    key={drop.id}
                    coordinate={{
                        latitude: coordinates.lat,
                        longitude: coordinates.lng,
                    }}
                    title={drop.location}
                    description={drop.caption}
                />
            );
        });
    }


    useEffect(() => {
        const fetchData = async () => {
            await fetchTravelGeometry();
          };
          fetchData();
        } , [drops]);


    const count = 1;

    return (
        <ScrollView style = {{backgroundColor:"white", paddingLeft:10, paddingRight:10}} > 
        <View style ={{paddingLeft:10, paddingRight:10}}>
            <Text style = {{color:"black", fontSize:22, fontFamily: "DMSans_700Bold"}}> 
                {name}
            </Text>
            {count > 0 &&
            <Text style = {{fontFamily: "DMSans_400Regular"}}>{count} saved drop{count > 1 && "s"}</Text>}
        </View>
        <View style = {{flexDirection: "row", justifyContent: "flex-end"}}>
            <TouchableOpacity onPress={toggleSwitch}>
                <Ionicons name={showMaps ? "map":"map-outline"} size={20} color={showMaps? "#aa1945": "black"} style={{marginRight: 10}}/>
            </TouchableOpacity>
        </View>
        {
        showMaps ? 
        <View style = {{alignItems:"center", justifyContent:"center"}}>
        <MapView
        provider={PROVIDER_DEFAULT} // remove if not using Google Maps
        style={{marginTop:10, width: 400, height:500}}
        initialRegion={{
          latitude: geometry[0]?.lat || 37.78825,
          longitude: geometry[0]?.lng || -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {renderMarkers()}
      </MapView>
      </View> 
        : 
          <DropsLayout drops = {drops} />
        }
        </ScrollView>



    )
}