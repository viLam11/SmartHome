import { Slot, useRouter, useSegments } from "expo-router";
import React from "react";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Text strings must be rendered within a <Text>']);   

export default function RootLayout() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const segments = useSegments();
  const router = useRouter();

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

  return <GestureHandlerRootView>
          <Slot/>
      </GestureHandlerRootView>
}
