import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import images from '@/constants/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

export default function WelcomeScreen() {
    const router = useRouter();
    const [token, setToken] = useState<null | string>(null);
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
          console.log(
            "🔔 Notification Response: ",
            JSON.stringify(response.notification.request.content.data, null, 2)
          );
          
          // Điều hướng khi người dùng bấm vào thông báo
          router.push('/(root)/profile/notification');
        });
      
        return () => subscription.remove();
      }, []);

    return (
        <SafeAreaView className="flex-1 bg-white items-center justify-center">
            
            <View className="absolute top-0 w-full h-[45%] bg-black rounded-b-3xl" />

            <View className="bg-yellow-500 p-4 rounded-lg mb-4">
                <Image source={images.logo} className="w-12 h-12" />
            </View>

            <Text className="text-2xl font-bold text-black">SmartHome</Text>
            <Text className="text-gray-500 mt-2">A new way to control your home</Text>

        {/* COMMENT */}
            <Link href="/devices/stats/2" > 
                <Text>Static</Text>
            </Link>
            <Link href="/devices/stats/overview" > 
                <Text className='bg-blue-200 border-black rounded-md p-2'>Overview</Text>
            </Link>
            { token ? 
                 <TouchableOpacity 
                 className="absolute bottom-10 w-[40%] mx-auto bg-orange-500 px-6 py-3 rounded-lg self-center"
                 onPress={() => router.push('/rooms/home')}
                    ><Text className="text-white font-bold text-center">GET STARTED</Text>
                    </TouchableOpacity> : 
                <TouchableOpacity 
                className="absolute bottom-10 w-[40%] mx-auto bg-orange-500 px-6 py-3 rounded-lg self-center"
                onPress={() => router.push('/auth/sign-in')}
            ><Text className="text-white font-bold text-center">GET STARTED</Text>
            </TouchableOpacity>
            }
            
                
        </SafeAreaView>
    );
}
