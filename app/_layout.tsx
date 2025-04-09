import { useFonts } from 'expo-font';
import { DMSans_700Bold, DMSans_400Regular, DMSans_500Medium } from '@expo-google-fonts/dm-sans';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Stack } from "expo-router";

import { UserProvider } from "../assets/components/UserContext";
import { PostProvider } from "../assets/components/PostContext"; // ✅ Import PostProvider

export default function RootLayout() {
  const [loaded, error] = useFonts({
    DMSans_700Bold,
    DMSans_400Regular,  
    DMSans_500Medium
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <UserProvider>
      <PostProvider> {/* Wrap everything inside PostProvider. Need to persist posts with AsyncStorage or send them to a backend! */}
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="sections/SelectInterests" options={{ headerShown: true, title:"", headerShadowVisible: false }} />
          <Stack.Screen name="sections/GetLocation" options={{ headerShown: true, title: "Location", headerShadowVisible: false}} />
          <Stack.Screen name="sections/GetPicture" options={{ headerShown: true, title: "", headerShadowVisible: false}} />
          <Stack.Screen name="sections/signin" options={{ headerShown: false }} />
          <Stack.Screen name="sections/signup" options={{ headerShown: false }} />
          <Stack.Screen name="pages/PinPage" options={{ headerShown: true, title: "", headerShadowVisible: false}} />
          <Stack.Screen name="pages/CollectionPage" options={{ headerShown: true, title: "", headerShadowVisible: false}} />
        </Stack>
      </PostProvider>
    </UserProvider>
  );
}
