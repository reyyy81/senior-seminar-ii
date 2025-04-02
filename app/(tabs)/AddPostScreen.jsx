import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const images = [
  require('../../assets/images/backpacker.png'),
  require('../../assets/images/bali.png'),
  require('../../assets/images/addPostScreen/bali 4.png'),
  require('../../assets/images/matcha.png'),
  require('../../assets/images/addPostScreen/bali 2.png'),
  require('../../assets/images/addPostScreen/bali 3.png'),
  require('../../assets/images/besideAsea.png'),
  require('../../assets/images/nailsalonpt2.png'),
  require('../../assets/images/louisiana.png'),
  require('../../assets/images/alley.png'),
  require('../../assets/images/nailsalon.png'),
  
];

export default function AddPostScreen() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(images[0]);

  const toggleSelect = (index) => {
    const newSelected = [...selectedImages];
    const found = newSelected.indexOf(index);
    if (found > -1) {
      newSelected.splice(found, 1);
    } else {
      newSelected.push(index);
    }
    setSelectedImages(newSelected);
    setPreviewImage(images[index]);
  };

  const getSelectionNumber = (index) => {
    const pos = selectedImages.indexOf(index);
    return pos > -1 ? pos + 1 : null;
  };

  const handleNext = () => {
    if (selectedImages.length === 0) return;
    // We'll pass the selected indexes and re-map images in AddPostDetails
    router.push({
      pathname: "/sections/AddPostDetails",
      params: { selected: JSON.stringify(selectedImages.map(i => images[i])) }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.backArrow}>{'<'}</Text>
        <Text style={styles.title}>All pictures</Text>
        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.next}>next</Text>
        </TouchableOpacity>
      </View>

      <Image source={previewImage} style={styles.previewImage} />

      <View style={styles.pagination}>
        <View style={styles.dotActive} />
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

      <FlatList
        data={images}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const selection = getSelectionNumber(index);
          return (
            <TouchableOpacity onPress={() => toggleSelect(index)} style={styles.imageWrapper}>
              <Image source={item} style={styles.gridImage} />
              {selection && (
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>{selection}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 10, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center'
  },
  backArrow: { fontSize: 24 },
  title: { fontSize: 16, fontWeight: '600', fontFamily: "DMSans_700Bold", },
  next: { color: '#B83280', fontWeight: '600', fontSize: 16 },

  previewImage: {
    width: '90%',
    height: 400,
    alignSelf: 'center',
    borderRadius: 12,
    resizeMode: 'cover',
  },
  pagination: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#ccc', marginHorizontal: 4
  },
  dotActive: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#A83279', marginHorizontal: 4
  },
  grid: { paddingHorizontal: 10 },
  imageWrapper: { width: '23%', margin: '1%', aspectRatio: 1 },
  gridImage: { width: '100%', height: '100%', borderRadius: 6 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlayText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});


// import React, { useState } from 'react';
// import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// const images = [
//   require('../../assets/images/hiking-1-p.jpg'),
//   require('../../assets/images/hiking-2-p.jpg'),
//   require('../../assets/images/food-1-l.jpg'),
//   require('../../assets/images/food-2-p.jpg'),
// ];

// export default function AddPostScreen() {
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [previewImage, setPreviewImage] = useState(images[0]);

//   const toggleSelect = (index) => {
//     const newSelected = [...selectedImages];
//     const found = newSelected.indexOf(index);
//     if (found > -1) {
//       newSelected.splice(found, 1);
//     } else {
//       newSelected.push(index);
//     }
//     setSelectedImages(newSelected);
//     setPreviewImage(images[index]);
//   };

//   const getSelectionNumber = (index) => {
//     const pos = selectedImages.indexOf(index);
//     return pos > -1 ? pos + 1 : null;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.backArrow}>{'<'}</Text>
//         <Text style={styles.title}>All pictures</Text>
//         <Text style={styles.next}>next</Text>
//       </View>

//       <Image source={previewImage} style={styles.previewImage} />

//       <View style={styles.pagination}>
//         <View style={styles.dotActive} />
//         <View style={styles.dot} />
//         <View style={styles.dot} />
//         <View style={styles.dot} />
//       </View>

//       <FlatList
//         data={images}
//         numColumns={4}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item, index }) => {
//           const selection = getSelectionNumber(index);
//           return (
//             <TouchableOpacity onPress={() => toggleSelect(index)} style={styles.imageWrapper}>
//               <Image source={item} style={styles.gridImage} />
//               {selection && (
//                 <View style={styles.overlay}>
//                   <Text style={styles.overlayText}>{selection}</Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           );
//         }}
//         contentContainerStyle={styles.grid}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 50, backgroundColor: '#fff' },
//   header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10 },
//   backArrow: { fontSize: 24 },
//   title: { fontSize: 16, fontWeight: '600' },
//   next: { color: '#B83280', fontWeight: '600' },

//   previewImage: { width: '90%', height: 180, alignSelf: 'center', borderRadius: 12 },
//   pagination: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
//   dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc', marginHorizontal: 4 },
//   dotActive: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#A83279', marginHorizontal: 4 },

//   grid: { paddingHorizontal: 10 },
//   imageWrapper: { width: '23%', margin: '1%', aspectRatio: 1 },
//   gridImage: { width: '100%', height: '100%', borderRadius: 6 },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     borderRadius: 6,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   overlayText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
// });



// import { useState } from 'react';
// import { Button, Image, View, StyleSheet } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';

// export default function AddPostScreen() {
//   const [image, setImage] = useState<string | null>(null);

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ['images', 'videos'],
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     console.log(result);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {image && <Image source={{ uri: image }} style={styles.image} />}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   image: {
//     width: 200,
//     height: 200,
//   },
// });

// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// export default function AddPostScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Add Post Screen</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   text: { fontSize: 24, fontWeight: "bold" },
// });

