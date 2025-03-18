import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { IconSymbol } from '@/components/ui/IconSymbol';
import images from '@/constants/images';

export default function Property() {
    const router = useRouter();
    const roomName = useState(["Phòng Khách", "Phòng Ngủ", "Phòng Bếp"]);  

    const {id} = useLocalSearchParams();
    return (
        <ScrollView className='mx-2 mt-1'>
            <View className='flex flex-row justify-between'>    
                <View className="mx -2">
                    <TouchableOpacity onPress={() => {router.push(`/properties/home`)}}>
                        <IconSymbol name="back" />    
                    </TouchableOpacity>
                </View>
                <View>
                    <Text className="text-2xl font-bold">{roomName[0][id]}</Text>
                </View>
                <View className='bg-black rounded-full w-8 h-8 flex items-center justify-center' >
                    <IconSymbol name="add" color="white"/>
                </View>
            </View>
            <View className="my-4 overflow-hidden rounded-lg">
                <ImageBackground 
                    source={images.home1} 
                    style={{ width: "100%", height: 120, borderRadius: 12 }}
                    resizeMode="cover"
                >
                    <View className="p-3">
                        <Text className="text-2xl font-bold text-white">Phòng khách</Text>
                        <Text className="text-white">6 thiết bị</Text>
                    </View>
                </ImageBackground>
            </View>

            <View className='flex flex-row '>
                <View className='w-1/2 flex flex-col  '>
                    <View className="bg-white m-2 p-2 rounded-lg">
                        <View className="flex flex-row items-center">
                            <View className='w-1/3'>
                                <Image source={images.fan}   style={{ width: 40, height: 40, tintColor: "#FFD700" }}  />
                            </View>
                            <View className='w-2/3'>
                                <Text className='ml-4 text-xl font-bold'>Quạt</Text>
                                <Text className='ml-4 color-gray-500'>2 thiết bị</Text>
                            </View>
                        </View>

                        <View className='mt-2'>
                            {Array.from({ length: 2 }).map((_, index) => (
                                <View key={index} className="w-2/3 mt-2 bg-disable p-2 rounded-xl">
                                    <TouchableOpacity onPress={() => {router.push(`/fans/${id}`)}}>   
                                        <Text className='font-semibold'>Quạt trần {index + 1}</Text>
                                    </TouchableOpacity>
                                    
                                </View>
                            ))}
                        </View>

                    </View>
                </View>

                <View className='w-1/2 flex flex-col  '>
                    <View className="bg-white m-2 p-2 rounded-lg">
                        <View className="flex flex-row items-center">
                            <View className='w-1/3'>
                                <Image source={images.lightbulb}   style={{ width: 40, height: 40, tintColor: "#FFD700" }}  />
                            </View>
                            <View className='w-2/3'>
                                <Text className='ml-4 text-xl font-bold'>Đèn</Text>
                                <Text className='ml-4 color-gray-500'>2 thiết bị</Text>
                            </View>
                        </View>

                        <View className='mt-2'>
                            {Array.from({ length: 2 }).map((_, index) => (
                                <View key={index} className="w-2/3 mt-2 bg-enable p-2 rounded-xl">
                                    <TouchableOpacity onPress={() => {router.push(`/lights/${id}`)}}>   
                                        <Text className='font-semibold'>Đèn trần {index + 1}</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>

                    </View>
                </View>
                
            </View>

            <View className='flex flex-row '>
                <View className='w-1/2 flex flex-col  '>
                    <View className="bg-white m-2 p-2 rounded-lg">
                        <View className="flex flex-row items-center">
                            <View className='w-1/3'>
                                <Image source={images.aircondition}   style={{ width: 40, height: 40, tintColor: "#FFD700" }}  />
                            </View>
                            <View className='w-2/3'>
                                <Text className='ml-4 text-xl font-bold'>Máy lạnh</Text>
                                <Text className='ml-4 color-gray-500'>1 thiết bị</Text>
                            </View>
                        </View>

                        <View className='mt-2'>
                            {Array.from({ length: 1 }).map((_, index) => (
                                <View key={index} className="w-2/3 mt-2 bg-disable p-2 rounded-xl">
                                    <Text className='font-semibold'>Máy lạnh {index + 1}</Text>
                                </View>
                            ))}
                        </View>

                    </View>
                </View>

                <View className='w-1/2 flex flex-col  '>
                    <View className="bg-white m-2 p-2 rounded-lg">
                        <View className="flex flex-row items-center">
                            <View className='w-1/3'>
                                <Image source={images.aircondition}   style={{ width: 40, height: 40, tintColor: "black" }}  />
                            </View>
                            <View className='w-2/3'>
                                <Text className='ml-4 text-xl font-bold'>Cảm biến</Text>
                                <Text className='ml-4 color-gray-500'>2 thiết bị</Text>
                            </View>
                        </View>

                        <View className='mt-2'>
                            {Array.from({ length: 2 }).map((_, index) => (
                                <View key={index} className="w-2/3 mt-2 bg-enable p-2 rounded-xl">
                                    <Text className='font-semibold'>Cảm biến {index +1}</Text>
                                </View>
                            ))}
                        </View>

                    </View>
                </View>
                
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({})

