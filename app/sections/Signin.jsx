import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Modal, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig"; 

export default function Signin({ visible, onClose = () => {} }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    if (!email.endsWith("@gmail.com")) {
      setEmailError("Please use a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSignin = async () => {
    if (!email || !password || emailError) {
      Alert.alert("Invalid Input", "Please enter a valid email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // console.log("User signed in:", email);
      onClose();
      setTimeout(() => {
        router.push("/(tabs)/FypScreen");
      }, 30);
    } catch (error) {
      Alert.alert("Sign In Failed", error.message);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <TextInput
            style={[styles.input, emailError ? styles.errorInput : null]}
            placeholder="Email address"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              validateEmail(text);
            }}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="gray" />
            </TouchableOpacity>
          </View>

          <Pressable onPress={handleSignin} style={styles.signinButton}>
            <Text style={styles.signinText}>Sign In</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    width: "85%",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "gray",
    marginTop: 5,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  errorInput: {
    borderColor: "#E60023",
  },
  errorText: {
    color: "#E60023",
    fontSize: 12,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  passwordInput: {
    flex: 1,
  },
  signinButton: {
    backgroundColor: "black",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  signinText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
