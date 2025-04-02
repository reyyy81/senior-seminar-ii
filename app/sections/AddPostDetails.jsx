import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

export default function AddPostDetails() {
  const { selected } = useLocalSearchParams();
  const selectedImages = JSON.parse(selected || '[]');

  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handlePost = () => {
    console.log("Post created:", { location, description, tags, selectedImages });
    router.push("/(tabs)/FypScreen");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.backArrow}>{'<'}</Text>
        <Text style={styles.username}>jSmith24</Text>
      </View>

      {/* Selected Images */}
      <View style={styles.imageRow}>
        {selectedImages.map((img, index) => (
          <Image key={index} source={img} style={styles.selectedImage} />
        ))}
      </View>

      {/* Location Input */}
      <Text style={styles.label}>
        Location<Text style={{ color: 'red' }}>*</Text>
      </Text>
      <TextInput
        placeholder="Search Maps"
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backArrow: { fontSize: 24, marginRight: 10 },
  username: { fontWeight: '600', marginLeft: 8 },

  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 10,
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
    fontFamily: "DMSans_400Bold"
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



// import React, { useState, useEffect } from 'react';
// import {
//   View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView
// } from 'react-native';
// import { useLocalSearchParams, router } from 'expo-router';
// import * as Location from 'expo-location';

// export default function AddPostDetails() {
//   const { selected } = useLocalSearchParams();
//   const selectedImages = JSON.parse(selected || '[]');

//   const [location, setLocation] = useState('');
//   const [description, setDescription] = useState('');
//   const [tags, setTags] = useState('');

//   // ✅ Auto-fetch location and fill it in
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.log('Permission to access location was denied');
//         return;
//       }

//       let currentLocation = await Location.getCurrentPositionAsync({});
//       const coords = {
//         latitude: currentLocation.coords.latitude,
//         longitude: currentLocation.coords.longitude
//       };

//       let [geo] = await Location.reverseGeocodeAsync(coords);
//       if (geo) {
//         const formatted = `${geo.name || ''}, ${geo.city || ''}, ${geo.region || ''}`;
//         setLocation(formatted);
//       }
//     })();
//   }, []);

//   const handlePost = () => {
//     console.log("Post created:", { location, description, tags, selectedImages });
//     router.push("/(tabs)/FypScreen");
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.backArrow}>{'<'}</Text>
//         <Text style={styles.username}>jSmith24</Text>
//       </View>

//       {/* Selected Images */}
//       <View style={styles.imageRow}>
//         {selectedImages.map((img, index) => (
//           <Image key={index} source={img} style={styles.selectedImage} />
//         ))}
//       </View>

//       {/* Location Input */}
//       <Text style={styles.label}>
//         Location<Text style={{ color: 'red' }}>*</Text>
//       </Text>
//       <TextInput
//         placeholder="Search Maps"
//         style={styles.input}
//         value={location}
//         onChangeText={setLocation}
//       />

//       {/* Description */}
//       <Text style={styles.label}>Comments / Description</Text>
//       <TextInput
//         placeholder="Cool spot? Write about it"
//         style={[styles.input, styles.descriptionBox]}
//         multiline
//         maxLength={150}
//         value={description}
//         onChangeText={setDescription}
//       />
//       <Text style={styles.charCount}>{150 - description.length} chars</Text>

//       {/* Tags */}
//       <Text style={styles.label}>Tags</Text>
//       <TextInput
//         placeholder="food, pasta, ..."
//         style={styles.input}
//         value={tags}
//         onChangeText={setTags}
//       />

//       {/* Link */}
//       <TouchableOpacity>
//         <Text style={styles.link}>Add to a collection? &gt;</Text>
//       </TouchableOpacity>

//       {/* Post Button */}
//       <TouchableOpacity style={styles.postButton} onPress={handlePost}>
//         <Text style={styles.postText}>Post</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20, backgroundColor: '#fff', flex: 1 },
//   header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
//   backArrow: { fontSize: 24, marginRight: 10 },
//   username: { fontWeight: '600', marginLeft: 8 },

//   imageRow: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginVertical: 10,
//   },
//   selectedImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 12,
//     marginRight: 10,
//     marginBottom: 10,
//   },

//   label: {
//     marginTop: 12,
//     fontWeight: '500',
//     fontFamily: "DMSans_700Bold"
//   },
//   input: {
//     backgroundColor: '#eee',
//     padding: 12,
//     borderRadius: 10,
//     marginTop: 6,
//     fontFamily: "DMSans_400Bold"
//   },
//   descriptionBox: { height: 100, textAlignVertical: 'top' },
//   charCount: { alignSelf: 'flex-end', fontSize: 12, color: '#990033' },

//   link: { color: '#0033cc', marginTop: 12 },
//   postButton: {
//     backgroundColor: '#9A1454',
//     alignItems: 'center',
//     padding: 12,
//     borderRadius: 25,
//     marginTop: 20
//   },
//   postText: {
//     color: 'white',
//     fontWeight: '600',
//     fontFamily: "DMSans_700Bold"
//   }
// });
