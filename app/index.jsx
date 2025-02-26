import { View } from "react-native";
import { useState } from "react";
import WelcomeScreen from "./sections/WelcomeScreen";
import Signup from "./sections/Signup";
import Signin from "./sections/Signin";

export default function Index() {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      {/* Show the Pinterest-style Welcome Screen */}
      <WelcomeScreen onSignup={() => setShowSignup(true)} onSignin={() => setShowSignin(true)} />

      {/* Signup & Signin Modals */}
      {showSignup && <Signup visible={showSignup} onClose={() => setShowSignup(false)} />}
      {showSignin && <Signin visible={showSignin} onClose={() => setShowSignin(false)} />}
    </View>
  );
}



// import { Text, View, Pressable } from "react-native";
// import { router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons"; 
// import Signup from "./sections/signup"; 
// import Signin from "./sections/signin";
// import { useState } from "react";
// import WelcomeScreen from "./sections/WelcomeScreen";

// // import BottomTabs from "./components/BottomTabs"

// export default function Index() {
//   const [showSignup, setShowSignup] = useState(false);
//   const [showSignin, setShowSignin] = useState(false);


//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {/*  Ensures Signup component is properly rendered with onClose */}
//       {showSignup && <Signup visible={showSignup} onClose={() => setShowSignup(false)} />}
//       {showSignin && <Signin visible={showSignin} onClose={() => setShowSignin(false)} />}


//       <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>HomePage</Text>

//       {/*  Signup Button */}
//       <Pressable
//         onPress={() => setShowSignup(true)}
//         style={({ pressed }) => ({
//           paddingVertical: 12,
//           paddingHorizontal: 20,
//           borderRadius: 10,
//           backgroundColor: pressed ? "#black" : "black", 
//         })}
//       >
//         <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Sign Up</Text>
//       </Pressable>

//         {/*  Sign In Button */}
//         <Pressable
//         onPress={() => setShowSignin(true)}
//         style={({ pressed }) => ({
//           paddingVertical: 12,
//           paddingHorizontal: 20,
//           borderRadius: 10,
//           backgroundColor: pressed ? "#ddd" : "#f0f0f0",
//           marginBottom: 10,
//         })}
//       >
//         <Text style={{ color: "black", fontWeight: "bold", fontSize: 16 }}>Sign In</Text>
//       </Pressable>


//       {/* User Profile Button */}
//       <Pressable
//         onPress={() => router.push("./sections/ProfileScreen")}
//         style={({ pressed }) => ({
//           marginTop: 20,
//           padding: 10,
//           borderRadius: 10,
//           backgroundColor: pressed ? "#ddd" : "#f0f0f0",
//         })}
//       >
//         <Ionicons name="person-circle-outline" size={40} color="black" />
//       </Pressable>

//       <Pressable
//         onPress={() => router.push("./sections/FypScreen")}
//         style={({ pressed }) => ({
//           marginTop: 20,
//           padding: 10,
//           borderRadius: 10,
//           backgroundColor: pressed ? "#ddd" : "#f0f0f0",
//         })}
//       >
//         <Text>HomeScreen nav</Text>
//         {/* <Ionicons name="person-circle-outline" size={40} color="black" /> */}
//       </Pressable>

//       <Pressable>
//         <Text> Hello </Text>
//       </Pressable>
//     </View>
//   );
// }
