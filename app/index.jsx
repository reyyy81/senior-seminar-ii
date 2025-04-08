import 'react-native-get-random-values';
import { useEffect, useState, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import WelcomeScreen from "./sections/WelcomeScreen";
// import FypScreen from './(tabs)/FypScreen';
import GetPicture from "./sections/GetPicture";
import { UserContext } from "../assets/components/UserContext";


export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState();
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!user);
      setUser(user); 
      if (user) {
        setUserData((prev) => ({ ...prev, email: user.email })); // Update email in context
        console.log("User is logged in");
      } else {
        console.log("User is logged out");
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  if (isLoggedIn === null) {
    return null; // Show nothing or a loading spinner while checking auth state
  }

  // If user is logged in, show the FypScreen, else show the WelcomeScreen
  // TODO: Pull from database to check if user has completed onboarding
  // if done onboarding, show FypScreen, else show GetPicture
  return isLoggedIn ? <GetPicture /> :  <WelcomeScreen />;
}
