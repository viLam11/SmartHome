import images from '@/constants/images';
import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
const styles = StyleSheet.create({})
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
export default function Navigation({current}){
    const [currentTab, setCurrentTab] = useState(current);
    const router = useRouter();
    function handleClick(index) {
        setCurrentTab(index);
        if (index === 2) {
            router.navigate('/rooms/home'); 
        } 
        if (index == 3) {
            router.navigate('/profile/profile');
        }
    }

    if (currentTab === 1) {    
        return(
            <View className='h-14 mx-2 rounded-2xl overflow-hidden'>
                <View className='h-full bg-black w-full flex flex-row '>
                    <View className="w-1/2 items-center justify-center">
                        <View className='flex flex-row items-center justify-center bg-gray-600 rounded-xl px-2'>
                            <Image source={images.dashboard} style={{width: "30%", height: 40}} resizeMode='contain'></Image>
                            <Text className="text-white font-bold text-lg">Dashboard</Text> 
                        </View>
                    </View> 
                    <View className="w-1/4 bg-black">
                        <View>
                            <TouchableOpacity onPress={() => handleClick(2)} className='h-full flex flex-row items-center justify-center '>
                                <Image source={images.door} style={{width: "60%", height: 40}} resizeMode='contain'></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View className="w-1/4 bg-black">
                        <View>
                            <TouchableOpacity onPress={() => handleClick(3)} className='h-full flex flex-row items-center justify-center'>
                                <Image source={images.user} style={{width: "60%", height: 40}} resizeMode='contain'></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View> 
        )
    } 
    else if (currentTab === 2) {
        return(
            <View className='h-14 mx-2 rounded-2xl overflow-hidden'>
                <View className='h-full bg-black w-full flex flex-row '>
                    <View className="w-1/4 bg-black">
                        <TouchableOpacity onPress={() => handleClick(1)}  className='h-full flex flex-row items-center justify-center '>
                            <Image source={images.dashboard} style={{width: "60%", height: 40}} resizeMode='contain'></Image>
                        </TouchableOpacity >
                    </View>
                    
                    <View className="w-1/2 items-center justify-center">
                        <View className='flex flex-row items-center justify-center bg-gray-600 rounded-xl px-2'>
                            <Image source={images.door} style={{width: "30%", height: 40}} resizeMode='contain'></Image>
                            <Text className="text-white font-bold text-lg">Rooms</Text>
                        </View>
                    </View> 
                    
                    <View className="w-1/4 bg-black">
                        <TouchableOpacity onPress={() => handleClick(3)} className='h-full flex flex-row items-center justify-center '>
                            <Image source={images.user} style={{width: "60%", height: 40}} resizeMode='contain'></Image>
                        </TouchableOpacity>
                    </View>
                </View>
            </View> 
        )
    }
    return(
        <View className='h-14 mx-2 rounded-2xl overflow-hidden'>
            <View className='h-full bg-black w-full flex flex-row '>
                
                <View className="w-1/4 bg-black">
                    <TouchableOpacity onPress={() => handleClick(1)} className='h-full flex flex-row items-center justify-center '>
                        <Image source={images.dashboard} style={{width: "60%", height: 40}} resizeMode='contain'></Image>
                    </TouchableOpacity>
                </View>
                <View className="w-1/4 bg-black">
                    <TouchableOpacity onPress={() => handleClick(2)} className='h-full flex flex-row items-center justify-center '>
                        <Image source={images.door} style={{width: "60%", height: 40}} resizeMode='contain'></Image>
                    </TouchableOpacity>
                </View>

                <View className="w-1/2 items-center justify-center">
                    <View className='flex flex-row items-center justify-center bg-gray-600 rounded-xl px-2'>
                        <Image source={images.user} style={{width: "30%", height: 40}} resizeMode='contain'></Image>
                        <Text className="text-white font-bold text-lg">Profile</Text> 
                    </View>
                </View>
            </View>
        </View> 
    )
    
}