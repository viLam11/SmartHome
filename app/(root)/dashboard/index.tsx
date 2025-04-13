import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import images from '@/constants/images';

const buttons = [
  { label: 'Statistic', route: '/dashboard/statistic', bg: 'bg-blue-500' },
  { label: 'My Rooms', route: '/rooms/home', bg: 'bg-green-500' },
];

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white items-center">
      <View className="top-0 w-full h-[30%] bg-black rounded-b-3xl">        
        <View className="mt-12 p-4 rounded-lg mb-4">
            <Text className="text-3xl text-white font-bold text-center">WELCOME</Text>
        </View>
      </View>
      <View className="flex flex-row p-6 w-full place-content-between">
          {buttons
            .map(({ label, route, bg }) => (
                <TouchableOpacity
                    key={label}
                    className={`flex flex-col mt-1 w-[45%] items-center rounded-lg ${bg} justify-center items-center`}
                    onPress={() => router.push(route)}
                >
                    <View className="w-full h-full px-6 py-3 ">
                        <Text className="text-white font-bold text-center">{label}</Text>
                    </View>
                </TouchableOpacity>
            ))}

      </View>
    </SafeAreaView>
  );
}
