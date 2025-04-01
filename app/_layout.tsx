import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "../global.css";
import SignIn from "./(root)/auth/sign-in";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import GlobalProvider from "@/lib/global-provider";

export default function RootLayout() {
  const [token, setToken] = useState(null); 
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // useEffect(() => {
  //   var fetchToken = async () => {
  //     const token = await AsyncStorage.getItem("authToken");
  //     if (token) {
  //       console.log("Token found:", token);
  //       setToken(token);
  //     }
  //   }
  //   fetchToken();
  // }, []);

  // if(token) {
  //   return (
  //     <GestureHandlerRootView style={{ flex: 1 }} >
  //       <SafeAreaProvider>
  //         <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}> 
  //           <Stack.Screen name="(tabs)" options={{ headerShown: false }}  />
  //         </Stack>
  //       </SafeAreaProvider>
  //     </GestureHandlerRootView>
  //   ) 
  // }
  return (
    
    <GestureHandlerRootView style={{ flex: 1 }} >
      <SafeAreaProvider>
        <Stack initialRouteName="index" screenOptions={{ headerShown: false }}> 
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }}  />
          <Stack.Screen name="index" options={{ headerShown: false }}/>
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
