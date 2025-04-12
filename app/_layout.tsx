import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";
import { LoadingProvider, useLoading } from "../contexts/LoadingContext";
import Loading from "../components/common/Loading";

function AppLayout() {
  const { loading } = useLoading();

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaProvider>
        <Stack initialRouteName="index">
          <Stack.Screen name="sign-in" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>

        {loading && <Loading />}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default function RootLayout() {
  return (
    <LoadingProvider>
      <AppLayout />
    </LoadingProvider>
  );
}
