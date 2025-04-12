import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function Loading() {
  return (
    <View className="absolute inset-0 bg-black/30 z-50 items-center justify-center">
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}
