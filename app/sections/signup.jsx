import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Modal, TouchableOpacity, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Signup({ visible, onClose = () => {} }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [dob, setDob] = useState(null);
  // const [open, setOpen] = useState(false);

  // handle signup and navigate to select interests page
  const handleSignup = () => {
    console.log("User signed up:", { email, password});
    onClose();
    setTimeout(() => {
      router.push("/sections/GetPicture");
    }, 300);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
        <View style={{ backgroundColor: "white", padding: 20, borderRadius: 15, width: "85%", alignItems: "center" }}>
          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={{ position: "absolute", top: 15, right: 15 }}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>Unlimited free access to the world's best spots</Text>
          <Text style={{ color: "gray", marginTop: 5 }}>Sign up to see more</Text>

          {/* Email Input */}
          <TextInput
            style={{ width: "100%", borderWidth: 1, borderColor: emailError ? "#E60023" : "#ddd", padding: 12, borderRadius: 8, marginTop: 15 }}
            placeholder="Email address"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError(text.endsWith("@gmail.com") ? "" : "Please use a valid email address");
            }}
          />
          {emailError ? <Text style={{ color: "#E60023", fontSize: 12, alignSelf: "flex-start", marginTop: 5 }}>{emailError}</Text> : null}

          {/* Password Input */}
          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", borderWidth: 1, borderColor: "#ddd", padding: 12, borderRadius: 8, marginTop: 15 }}>
            <TextInput style={{ flex: 1 }} placeholder="Password" secureTextEntry={!showPassword} value={password} onChangeText={setPassword} />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="gray" />
            </TouchableOpacity>
          </View>
          {/* Continue Button */}
          <Pressable onPress={handleSignup} style={{ backgroundColor: "black", paddingVertical: 12, width: "100%", borderRadius: 8, alignItems: "center", marginTop: 20 }}>
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>Continue</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
