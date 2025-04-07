import React, { useState, useEffect} from 'react';
import {View, StyleSheet , Text, RefreshControl} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AddPostDetails from '../sections/AddPostDetails';
import { useFocusEffect } from '@react-navigation/native'; // For resetting state on screen focus

export default function AddPostScreen() {
  
  const [images, setImages] = useState([]);
  const [showDetails, setShowDetails] = useState(false); // State to toggle between screens
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let results = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsMultipleSelection: true,
        selectionLimit: 5,
        quality: 1,
      });
  
      if (!results.canceled) {
        const uris = results.assets.map((asset) => asset.uri);
        setImages(uris);
        setShowDetails(true);
      }
    } catch (error) {
      console.error("Error picking images:", error);
    }
  };

  useEffect(() => {
    // Trigger the image picker when the component mounts
    const fetchData = async () => {
      await pickImage();
    };
    fetchData();
  }, []);

    // Function to handle refresh
    const onRefresh = async () => {
      setRefreshing(true);
  
      // Simulate a network request or data reload
      setTimeout(() => {
        console.log('Refreshed!');
        setRefreshing(false);
      }, 1500); // Simulate a 1.5-second delay
    };

    useFocusEffect(
      React.useCallback(() => {
        // Reset state when the screen is focused
        setImages([]);
        setShowDetails(false);
        pickImage(); // Reopen the image picker
      }, [])
    );
  

  return (
    <View style={styles.container} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
  >
      {showDetails ? (
        // Render AddPostDetails component and pass images as props
        <AddPostDetails images={images} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
