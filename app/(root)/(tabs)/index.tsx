import React from "react";
import { Text, View, Image } from "react-native";
import { Link, Redirect, router } from "expo-router";
import images from "@/constants/images";

export default function Index() {


  return (
    <View className="h-full">
        <Link href="/auth/sign-in">Sign In</Link>
        <Link href="/explore">Explore</Link>
        <Link href="/devices/fans/1">FANs</Link>
        <Link href="/devices/lights/1">Light</Link>
        <Link href="/devices/stats/1">Thống kê</Link>
        <Link href="/rooms/home">Property</Link>
    </View>
  );
}