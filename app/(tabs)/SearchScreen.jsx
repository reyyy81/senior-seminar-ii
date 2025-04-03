import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import posts from '../../assets/data/SearchPosts';

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState(posts);
  const [suggestions, setSuggestions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const allLocations = [...new Set(posts.map((p) => p.location))];

  const handleSearch = (text) => {
    setSearch(text);

    const matched = allLocations.filter((loc) =>
      loc.toLowerCase().startsWith(text.toLowerCase())
    );
    setSuggestions(text ? matched : []);

    const results = posts.filter((post) =>
      post.location.toLowerCase().includes(text.toLowerCase())
    );
    setFiltered(results);
  };

  const handleSuggestionPress = (location) => {
    setSearch(location);
    setSuggestions([]);
    filterByLocation(location);
  };

  const filterByLocation = (location) => {
    const results = posts.filter((post) =>
      post.location.toLowerCase().includes(location.toLowerCase())
    );
    setFiltered(results);
    setSearch(location);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        source={item.image}
        style={item.type === 'video' ? styles.video : styles.image}
      />
      {item.type === 'video' && (
        <Ionicons name="play-circle" size={36} color="#fff" style={styles.playIcon} />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          placeholder="Search DropSpot"
          value={search}
          onChangeText={handleSearch}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="filter" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Suggestion Dropdown */}
      {suggestions.length > 0 && (
        <View style={styles.suggestionBox}>
          {suggestions.map((loc, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => handleSuggestionPress(loc)}
              style={styles.suggestionItem}
            >
              <Text>{loc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Modal for Filtering */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter by Location</Text>
            {allLocations.map((loc, idx) => (
              <Pressable
                key={idx}
                style={styles.modalItem}
                onPress={() => {
                  filterByLocation(loc);
                  setModalVisible(false);
                }}
              >
                <Text>{loc}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>

      {/* Posts Grid */}
      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16,
    fontFamily: 'DMSans_400Regular',
  },

  suggestionBox: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  suggestionItem: {
    paddingVertical: 6,
  },

  grid: {
    gap: 10,
    paddingBottom: 20,
  },
  item: {
    flex: 1,
    aspectRatio: 1,
    margin: 5,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    opacity: 0.9,
  },
  playIcon: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
});

// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// export default function SearchScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Saved</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   text: { fontSize: 24, fontWeight: "bold" },
// });
