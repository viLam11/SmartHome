import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import images from '@/constants/images';
import { useState, useEffect } from 'react';
import { Table, Row } from "react-native-table-component";
import DeviceNav from '@/components/DeviceNav';
import Navigation from '@/components/Navigation';
import SpinningFan from '@/components/SpinningFan';

export default function Fan() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [color, setColor] = useState("white");

    function handleFanSpeed(speed) {}

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='min-h-screen flex flex-col m-2'>
            <View className='flex flex-row justify-between'>
                <View className="mx -2">
                    <TouchableOpacity onPress={() => { router.back() }}>
                        <IconSymbol name="back" />
                    </TouchableOpacity>
                </View>
                <Text className='text-xl font-bold'>QUẠT {+id}</Text>
                <View>
                </View>
            </View>
            <DeviceNav current={1} id={+id} type={"fan"} />
            
            <View className="flex flex-row mt-10">
                <View className='w-1/2'>
                    <SpinningFan />
                    <View className="flex flex-row items-center justify-center ">
                        <TouchableOpacity onPress={() => handleFanSpeed('low')} className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
                            <Text className="text-white">1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleFanSpeed('medium')} className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
                            <Text className="text-white">2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleFanSpeed('high')} className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
                            <Text className="text-white">3</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className='w-1/2 flex flex-col items-end px-4 '>
                    <Image source={images.power} style ={{width: 50, height: 50}}></Image>
                    <View></View>
                </View>
            </View>

            
            
            <View className="flex-grow"></View>
            <View className="h-32">
                <View className=" bottom-4 w-full">
                    <Navigation current={2} />
                </View>
            </View>
        </ScrollView>
    )
}