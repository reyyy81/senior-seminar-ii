import React, {useState, useEffect, useContext} from "react";
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from "../../assets/components/UserContext";
import { View, Text, StyleSheet, Pressable, Image, TextInput } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const defaultImage = require('../../assets/images/default.jpg');

export default function GetPicture() {
    const { userData, setUserData } = useContext(UserContext);
    const [image, setImage] = useState(null);
    // const [isValid, setIsValid] = useState(false);
    const [userName, setUserName] = useState("");

    const pickImage = async () => {
        try {
            let results = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'images',
                allowsMultipleSelection: false,
                allowsEditing: true,
                quality: 1,
            });

            if (!results.canceled) {
                const uri = results.assets[0].uri;
                setImage(uri);
                setUserData((prev) => ({ ...prev, image: uri }));
                console.log("Updated User Data:", userData);
            }
        } catch (error) {
            console.error("Error picking images:", error);
        }
    };

    const handleNext = () => {
        setUserData((prev) => ({ ...prev, name: userName }));
        console.log("Updated User Data:", userData);
        router.push("/sections/SelectInterests");
    };

    //TODO: vaLIDATE USERNAME

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.header}>
                <Image source={image ? {uri: image} : defaultImage} style={{ width: 200, height: 200, borderRadius: 100, marginBottom:20 }} />
                <Pressable onPress={pickImage} style={[styles.button, { backgroundColor: "#aa1945" }]}>
                    <Text style={styles.buttonText}>Choose your profile image</Text>
                </Pressable>
                <TextInput placeholder="Enter your username" value={userName} onChangeText={setUserName} maxLength={20} style={{  fontFamily: "DMSans_400Regular", borderWidth: 1, borderColor: 'gray', padding: 10, width: 300, marginTop: 40, borderRadius: 5}} />
            </View>
            {
                (userName.length > 0 && image) && (
                    <View style={{ alignItems:"left", marginTop: 40, paddingRight:20}}>
                    <Pressable onPress={() => handleNext()} style={[styles.button, { backgroundColor: "#aa1945",  marginLeft: "auto", width:100, flexDirection:"row", padding:8}]}>
                        <Text style={[styles.buttonText, {paddingBottom:4, paddingRight:1}]}>Continue</Text>
                        <Ionicons name="chevron-forward" size={24} color="white" />
                    </Pressable>
                    </View>
                )
            }
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        padding: 20,
    },
    header: {
        alignItems: "center",
    },
    button: {
        padding: 10,
        borderRadius: 15,
        marginTop: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontFamily: "DMSans_500Medium"
    },
});