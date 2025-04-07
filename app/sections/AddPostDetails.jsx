import React, { useState, useRef, useCallback, useContext} from 'react';
import {
  View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Pressable, ScrollView
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import secrets from "../../assets/data/Env";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { UserContext } from "../../assets/components/UserContext";
import { useLocalSearchParams, router } from 'expo-router';

export default function AddPostDetails({images}) {
  const { userData, setUserData } = useContext(UserContext);
  const bottomSheetModalRef = useRef(null);
  const [location, setLocation] = useState('Search Maps');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
      console.log('handleSheetChanges', index);
      setIsBottomSheetOpen(index >= 0);
   }, []);

  const handlePost = () => {
    console.log(images)
    console.log("Post created:", { location, description, tags });
    // router.push("/(tabs)/FypScreen");
  };

  return (
    <GestureHandlerRootView style ={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      {/* Selected Images */}
      <View style={styles.imageRow}>
        {images.map((img, index) => (
          <Image key={index} source={{uri : img}} style={styles.selectedImage} />
        ))}
      </View>
      
      {/* Location Input */}
      <Text style={styles.label}>
        Location<Text style={{ color: 'red' }}>*</Text>
      </Text>
      <Pressable
          onPress={handlePresentModalPress}
          style={styles.input}
        >
          <Text style={{ color: "black", fontSize: 14, width: 270}} numberOfLines={1} ellipsizeMode='tail'>{location}</Text>
          <Ionicons name="chevron-down" size={16} color="black" />
        </Pressable>
      

      {/* Description */}
      <Text style={styles.label}>Comments / Description</Text>
      <TextInput
        placeholder="Cool spot? Write about it"
        style={[styles.input, styles.descriptionBox]}
        multiline
        maxLength={150}
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.charCount}>{150 - description.length} chars</Text>

      {/* Tags */}
      <Text style={styles.label}>Tags</Text>
      <TextInput
        placeholder="food, pasta, ..."
        style={styles.input}
        value={tags}
        onChangeText={setTags}
      />

      {/* Link */}
      <TouchableOpacity>
        <Text style={styles.link}>Add to a collection? &gt;</Text>
      </TouchableOpacity>

      {/* Post Button */}
      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postText}>Post</Text>
      </TouchableOpacity>

      {/* Bottom Sheet Modal */}
      <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        snapPoints={["75%"]}
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
  </ScrollView>
  </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backArrow: { fontSize: 24, marginRight: 10 },
  username: { fontWeight: '600', marginLeft: 8 },

  contentContainer: {
    width:"100%",
    height:"100%",
    flex:1,
    backgroundColor:"white",
    alignItems: "center",
  },

  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  selectedImage: {
    width: "40%",
    height: "40%",
    flex: 1,
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
  },
  textInput: {
    borderColor:"grey",
    backgroundColor:"white",
    borderWidth: 1,
    color:"black",
    borderRadius:12,
    marginTop: 20,
  },
  label: {
    marginTop: 12,
    fontWeight: '500',
    fontFamily: "DMSans_700Bold"
  },
  input: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 10,
    marginTop: 6,
    fontFamily: "DMSans_400Bold",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  descriptionBox: { height: 100, textAlignVertical: 'top' },
  charCount: { alignSelf: 'flex-end', fontSize: 12, color: '#990033' },

  link: { color: '#0033cc', marginTop: 12 },
  postButton: {
    backgroundColor: '#9A1454',
    alignItems: 'center',
    padding: 12,
    borderRadius: 25,
    marginTop: 20
  },

  postText: {
    color: 'white',
    fontWeight: '600',
    fontFamily: "DMSans_700Bold"
  }
});



