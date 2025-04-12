import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import images from '@/constants/images';
import { IconSymbol } from './ui/IconSymbol';
import { rooms } from '@/constants/data';


export default function Room({ setRoomData, deleteMode, id, img, name, allDeviceCount, light, lightStatus, fan, fanStatus, sensor, sensorStatus }) {
    // deleteMode = true;
    function handleDeleteRoom() {
        const updateRoom = rooms.filter(room => room.id !== id);
        setRoomData(updateRoom);
    }
    return (
        <View className='bg-grey-400 h-60'>
            {deleteMode ?
                <View className='absolute top-0 z-10 right-0 p-1 bg-red-500 rounded-full'>
                    <TouchableOpacity onPress={handleDeleteRoom}>
                        <IconSymbol name="delete" color="white" />
                    </TouchableOpacity>
                </View>
                : <></>}
            <ImageBackground source={img} style={{ width: '100%', height: 120 }}  >
                <Text className='text-2xl font-bold text-white mt-4 ml-2'>{name}</Text>
                <Text className='text-white ml-2'>{allDeviceCount} thiết bị</Text>
            </ImageBackground>
            <View className='flex flex-row bg-gray-200 rounded-b-2xl'>
                <View className='w-12 flex flex-col items-center'>
                    <View className='bg-white p-2 rounded-full'>
                        <Image source={images.lightbulb}
                            style={{ tintColor: lightStatus !== 0 ? "#F5BA0B" : "black" }}
                        />
                    </View>
                    <Text className='font-semibold text-lg'>{light}</Text>
                </View>
                <View className='w-12 flex flex-col items-center'>
                    <View className='bg-white p-2 rounded-full'>
                        <Image source={images.fan}
                            style={{ tintColor: fanStatus !== 0 ? "#F5BA0B" : "black" }}
                        />
                    </View>
                    <Text className='font-semibold text-lg'>{fan}</Text>
                </View>
                <View className='w-12 flex flex-col items-center'>
                    <View className='bg-white w-11 h-11 rounded-full flex items-center justify-center'>
                        <Image source={images.aircondition}
                            style={{ tintColor: fanStatus !== 0 ? "#F5BA0B" : "black" }}
                        />
                    </View>
                    <Text className='font-semibold text-lg'>{sensor}</Text>
                </View>
            </View>
        </View>
    )
}