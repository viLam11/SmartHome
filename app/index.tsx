import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import images from '@/constants/images';

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white items-center justify-center">
            
            <View className="absolute top-0 w-full h-[45%] bg-black rounded-b-3xl" />

            <View className="bg-yellow-500 p-4 rounded-lg mb-4">
                <Image source={images.logo} className="w-12 h-12" />
            </View>

            <Text className="text-2xl font-bold text-black">SmartHome</Text>
            <Text className="text-gray-500 mt-2">A new way to control your home</Text>

            <TouchableOpacity 
                className="absolute bottom-10 w-[40%] mx-auto bg-orange-500 px-6 py-3 rounded-lg self-center"
                onPress={() => router.push('/auth/sign-in')}
            >
                <Text className="text-white font-bold text-center">GET STARTED</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
