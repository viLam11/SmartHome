import { Text, View } from "react-native";
import { Link } from "expo-router";


export default function Index() {
  return (
    <View className="flex flex-col items-center justify-center h-full">

      <Text className="font-bold my-10 font-rubik text-3xl">Welcome to ReState</Text>
      <Link href="/sign-in">Sign In</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/properties/1">Property</Link>
    </View>
  );
}