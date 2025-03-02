import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";


const genres = ["Travel", "Hiking", "Self-care", "Public Spaces", "Hanging out", "Solo dates", "Exercise", "Food and drinks", "Live Music"];

export default function SelectInterests() {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const toggleGenre = (genre) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genre)
        ? prevSelected.filter((item) => item !== genre)
        : [...prevSelected, genre]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What are your interests?</Text>
      <Text style={styles.subtitle}>Select your favorite type of activity so we can make the best suggestions.</Text>
      <View style={styles.genreContainer}>
        {genres.map((genre) => (
          <Pressable
            key={genre}
            onPress={() => toggleGenre(genre)}
            style={[styles.genreButton, selectedGenres.includes(genre) && styles.selectedGenreButton]}
          >
            <Text style={[styles.genreText, selectedGenres.includes(genre) && styles.selectedGenreText]}>
              {genre}
            </Text>
          </Pressable>
        ))}
        
      </View>
      {selectedGenres.length >= 3 && (
        <Pressable style={styles.nextButton} 
        onPress={() => router.push("/(tabs)/FypScreen")}> 
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  genreButton: {
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    margin: 5,
  },
  genreText: {
    color: "#000",
    fontSize: 16,
  },
  selectedGenreButton: {
    backgroundColor: "black",
    borderColor: "gray",
  },
  selectedGenreText: {
    color: "#fff",
  },
  nextButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});