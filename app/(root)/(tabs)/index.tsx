import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import images from '@/constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from "expo-notifications";
import { Subscription } from "expo-modules-core";
import Notification from '../profile/notification'

export default function WelcomeScreen() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    
    useEffect(() => {
        const loadToken = async () => {
            let t = await AsyncStorage.getItem('authToken');
            if (t) {
                setToken(t);
            }
        }
        loadToken();
    }, [])

     useEffect(() => {
        const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
          console.log("🔔 Notification Response: ", response);
          router.push('/(root)/profile/notification');
        });
      
        return () => subscription.remove();
      }, []);

  return (
    <View className="h-full">
        {/* <Link href="/auth/sign-in">Sign In</Link>
        <Link href="/explore">Explore</Link>
        <Link href="/profile/profile">Profile</Link>
        <Link href="/devices/fans/1">FANs</Link>
        <Link href="/devices/stats/1">Thống kê</Link>
        <Link href="/rooms/home">Property</Link> */}
        <Notification />
    </View>
  );
}
