import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import Navigation from '@/components/Navigation';
import DeviceHeader from '@/components/device/DeviceHeader';


export default function Sensor() {
    const feedId = useLocalSearchParams().id;

    return (
        <View className='flex-1'>
            <ScrollView className='min-h-screen flex-1'>
                <DeviceHeader feedId={+feedId} title="Sensor" />

                {/* Thong so */}
                <View className="bg-blue-50 shadow-lg w-11/12 mx-auto mt-6 rounded-xl p-4">
                    <View>
                        <View className="flex flex-row justify-between ">
                            <View className="">
                                <View className="bg-white rounded-full p-2 m-2">
                                    <IconSymbol name="wind" color="#158cdb" size={40} />
                                </View>
                                <Text className="font-semibold text-gray-500 italic text-center">Ánh sáng</Text>
                                <Text className="font-bold text-xl text-center">9 km/h</Text>
                            </View>
                            <View className="">
                                <View className="bg-white rounded-full p-2 m-2">
                                    <IconSymbol name="humidity" color="#158cdb" size={40} />
                                </View>
                                <Text className="font-semibold text-center text-gray-500 italic">Độ ẩm</Text>
                                <Text className="font-bold text-xl text-center">90 %</Text>
                            </View>
                        </View>
                    </View>
                </View>
                
            </ScrollView>
            <View className="absolute bottom-2 w-full">
                <Navigation current={2} />
            </View>
        </View>
    )
}