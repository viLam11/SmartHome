import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import images from '@/constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WelcomeScreen() {
    const router = useRouter();
    const [token, setToken] = useState(null);
    
    useEffect(() => {
        const loadToken = async () => {
            let t = await AsyncStorage.getItem('authToken');
            if (t) {
                setToken(t);
            }
        }
        loadToken();
    }, [])

  return (
    <View className="h-full">
      {/* <View className="bg-black-200 rounded-e-3xl h-1/3">
      </View>
      <Image source={images.logo} className="absolute bottom-1/2 left-1/3"></Image>
      <View className="text-center items-center mt-32 h-2/3">
        <Text className="font-bold text-3xl">SMART HOME</Text>
        <Text className="font-bold font-rubik ">A new way to control your home</Text>
        <View className="absolute bottom-40 left-1/2 -translate-x-1/2 bg-yellow rounded-md">
          <TouchableOpacity  className="font-bold p-2">
            <Text className="p-2 font-rubik-bold">GET STARTED</Text>
          </TouchableOpacity>
        </View>
      </View> */}

        <Link href="/auth/sign-in">Sign In</Link>
        <Link href="/explore">Explore</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/devices/fans/1">FANs</Link>
        <Link href="/devices/stats/1">Thống kê</Link>
        <Link href="/rooms/home">Property</Link>
    </View>
  );
}
