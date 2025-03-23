import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { IconSymbol } from '@/components/ui/IconSymbol';
import images from '@/constants/images';
import Navigation from '@/components/Navigation';
import {roomObject, deviceObject, getRoomDevices } from '@/services/deviceService';



const DEVICE_IMAGES: Record<string, any> = {
    fan: images.fan,
    light: images.lightbulb,
    sensor: images.aircondition,
};

const room = {
    "id": "R123",
    "name": "Phòng khách",
    "img": images.home1,
    "devices": []
}


export default function Property() {
    const router = useRouter();
    const [roomData, setRoomData] = useState<roomObject | null>(null);
    const [deviceList, setDeviceList] = useState<deviceObject[] | null>(null);
    const [deviceCounts, setDeviceCounts] = useState<Record<string, number>>({});
    // const [waring, setWaring] = useState(false);

    const {deviceListID} = useLocalSearchParams();
    useEffect(() => {
        (async () => {
            const response = await getRoomDevices(deviceListID as string);
            setDeviceList(response);

            // Đếm số lượng từng loại thiết bị
            const counts = response.reduce((acc, { tittle }) => {
                acc[tittle] = (acc[tittle] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            setDeviceCounts(counts);
            setRoomData(room);
        })();
    }, [deviceListID]);

    return (
        <View className='flex-1'>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='mt-1 flex-grow mx-2 min-h-screen'>
                <View className='flex flex-row justify-between'>
                    <TouchableOpacity onPress={() => router.push(`/deviceLists/home`)}>
                        <IconSymbol name="back" />    
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold">{roomData?.name}</Text>
                    <View className='bg-black rounded-full w-8 h-8 flex items-center justify-center'>
                        <IconSymbol name="add" color="white" />
                    </View>
                </View>
                
                <View className="my-4 overflow-hidden rounded-lg">
                    <ImageBackground source={roomData?.img} style={{ width: "100%", height: 120 }} resizeMode="cover">
                        <View className="p-3">
                            <Text className="text-2xl font-bold text-white">{roomData?.name}</Text>
                            <Text className="text-white">{deviceList?.length || 0} thiết bị</Text>
                        </View>
                    </ImageBackground>
                </View>
                
                <View className='flex flex-row flex-wrap'>
                    {Object.keys(deviceCounts).map((tittle) => {
                        const image = DEVICE_IMAGES[tittle];
                        const filteredDevices = deviceList?.filter(device => device.tittle === tittle) || [];
                        const formattedTitle = tittle.charAt(0).toUpperCase() + tittle.slice(1);

                        return (
                            <View key={tittle} className='w-1/2'>
                                <View className="bg-white m-2 p-2 rounded-lg">
                                    <View className="flex flex-row items-center">
                                        <Image source={image} style={{ width: 40, height: 40, tintColor: "#FFD700" }} />
                                        <View className='w-2/3'>
                                            <Text className='ml-4 text-xl font-bold'>{formattedTitle}</Text>
                                            <Text className='ml-4 text-gray-500'>{filteredDevices.length} thiết bị</Text>
                                        </View>
                                    </View>
                                    <View className='mt-2'>
                                        {filteredDevices.map((device, index) => (
                                            <View key={index} className="w-2/3 mt-2 p-2 rounded-xl bg-disable">
                                                <TouchableOpacity onPress={() => router.push(`/devices/${tittle + "s"}/${device.feedId}`)}>   
                                                    <Text className='font-semibold'>{device.name}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
            <View className="absolute bottom-2 w-full">
                <Navigation current={2} />
            </View>
        </View>
    );
}
