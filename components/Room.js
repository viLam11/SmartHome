import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import images from '@/constants/images';
import { IconSymbol } from './ui/IconSymbol';
import { useState, useEffect } from 'react';
import { rooms } from '@/constants/data';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const base_url = 'https://nearby-colleen-quanghia-3bfec3a0.koyeb.app/api/v1';
export default function Room({setRoomData, deleteMode, setDeleteMode, img, id, name, light, fan, sensor, device, light_on, fan_on}) {
    // deleteMode = true;
    const [token, setToken] = useState(null);
    useEffect(() => {
        const fetchToken = async () => {
            const authToken = await AsyncStorage.getItem("authToken");
            setToken(authToken);
        }
        fetchToken();   
    }, [])

    async function handleDeleteRoom() {
        console.log("### Delete room: ", id);
        if(!token) return;
        
        const response = await axios.delete(`${base_url}/rooms/${id}`, {
            headers: {
                Authorization: token
            }
        })
        setDeleteMode(false);
        console.log("### Delete room: ", response);
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
                <Text className='text-white ml-2'>{device} thiết bị</Text>
            </ImageBackground>
            <View className='flex flex-row bg-gray-200 rounded-b-2xl'>
                <View className='w-12 flex flex-col items-center'>
                    <View className='bg-white p-2 rounded-full'>
                        <Image source={images.lightbulb}
                            style={{ tintColor: light_on !== 0 ? "#F5BA0B" : "black" }}
                        />
                    </View>
                    <Text className='font-semibold text-lg'>{light}</Text>
                </View>
                <View className='w-12 flex flex-col items-center'>
                    <View className='bg-white p-2 rounded-full'>
                        <Image source={images.fan}
                            style={{ tintColor: fan_on !== 0 ? "#F5BA0B" : "black" }}
                        />
                    </View>
                    <Text className='font-semibold text-lg'>{fan}</Text>
                </View>
                <View className='w-12 flex flex-col items-center'>
                    <View className='bg-white w-11 h-11 rounded-full flex items-center justify-center'>
                        <Image source={images.sensor}
                            style={{width: 20, height: 20,  tintColor: fan_on !== 0 ? "#F5BA0B" : "black" }}
                        />
                    </View>
                    <Text className='font-semibold text-lg'>{sensor}</Text>
                </View>
            </View>
        </View>
    )
}