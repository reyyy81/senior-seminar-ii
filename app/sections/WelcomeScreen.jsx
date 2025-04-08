import React, {useState} from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import Signup from "./signup";
import Signin from "./signin";

const images = [
  { id: "1", uri: "https://media.gettyimages.com/id/1313763325/photo/matcha-tea-with-kettle.jpg?s=612x612&w=0&k=20&c=CS1X9PhmletbUY_v_C591xwPSSj9-Lz4lN9S-gQW2JI=" },
  { id: "2", uri: "https://media.gettyimages.com/id/1444443250/photo/happy-woman-with-arms-raised-in-motorboat.jpg?s=612x612&w=0&k=20&c=FzLGZLOocHAYv0J30AK4btivOobyTYJlrtDZLCkdyrM=" },
  { id: "3", uri: "https://media.gettyimages.com/id/1369654070/photo/young-couple-backpack-up-a-mountain-summit.jpg?s=612x612&w=0&k=20&c=FoNPI7a20i37uPDd3mx079gbaOCNkSM4a3hfKjQvFMo=" },
  { id: "4", uri: "https://media.gettyimages.com/id/1304715521/photo/from-plain-old-mud-to-an-amazing-bowl.jpg?s=612x612&w=0&k=20&c=eW3i6Jpw6zepf2JvUR6aa40PCPYsghZhcwGQho19yi4=" },
  { id: "5", uri: "https://media.gettyimages.com/id/1478332839/photo/friends-toasting-at-home-party.jpg?s=612x612&w=0&k=20&c=Pp25qVPUX3YQzMaE2fqpuTxXGu1lYxR12eJW6tu_rec=" },
{ id: "7", uri: "https://media.gettyimages.com/id/1402852398/photo/coffee-and-laughs.jpg?s=612x612&w=0&k=20&c=ubmCma5tsm8b1_Uq-cIXHwjkto-bhoQGhhqFxyJyKYM="},
]

export default function WelcomeScreen() {
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [isSigninVisible, setIsSigninVisible] = useState(false);


  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {images.map((item, index) => (
          <Image key={item.id} source={{ uri: item.uri }} style={[styles.image, index % 2 === 0 ? styles.largeImage : styles.smallImage]} />
        ))}
      </View>

      <Text style={styles.title}>Come explore with us!</Text>

      <Pressable style={styles.signupButton} onPress={() => setIsSignupVisible(true)}>
        <Text style={styles.signupText}>Sign up</Text>
      </Pressable>

      <Pressable style={styles.loginButton} onPress={() => setIsSigninVisible(true)}>
        <Text style={styles.loginText}>Log in</Text>
      </Pressable>

      <Signup
        visible={isSignupVisible}
        onClose={() => setIsSignupVisible(false)}
      />
      <Signin
        visible={isSigninVisible}
        onClose={() => setIsSigninVisible(false)}
      />

      <Text style={styles.footerText}>
        By continuing, you agree to Dropshot's Terms of Service and
        acknowledge you’ve read our Privacy Policy. Notice at collection.
      </Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingVertical: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    marginBottom: 20,
  },
  image: {
    borderRadius: 15,
    margin: 2,
  },
  largeImage: {
    width: 120,
    height: 160,
  },
  smallImage: {
    width: 140,
    height: 160,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 15,
  },
  title: {
    color: "black",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 40,
    marginBottom: 20,
  },
  signupButton: {
    backgroundColor: "black",
    width: "90%",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  signupText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "gray",
    width: "90%",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    color: "gray",
    fontSize: 12,
    textAlign: "center",
    paddingHorizontal: 30,
  },
  linkText: {
    textDecorationLine: "underline",
    color: "white",
  },
});
