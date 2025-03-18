import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import images from '@/constants/images';

export default function Room({img}) {
    return(
        <View className='bg-grey-400 h-60'>
            <ImageBackground source={img} style={{width: '100%', height: 120}}  >
                <Text className='text-2xl font-bold text-white mt-4 ml-2'>Phòng khách</Text>
                <Text className='text-white ml-2'>6 thiết bị</Text>
            </ImageBackground>
            <View className='flex flex-row bg-gray-200 rounded-b-2xl'>
                <View className='w-12 flex flex-col items-center'>
                    <View className='bg-white p-2 rounded-full'>
                      <Image source={images.lightbulb}></Image>
                    </View>
                    <Text className='font-semibold text-lg'>1</Text>
                </View>
                <View className='w-12 flex flex-col items-center'>
                    <View className='bg-white p-2 rounded-full'>
                      <Image source={images.fan}></Image>
                    </View>
                    <Text className='font-semibold text-lg'>2</Text>
                </View>
                <View className='w-12 flex flex-col items-center'>
                    <View className='bg-white w-11 h-11 rounded-full flex items-center justify-center'>
                      <Image source={images.aircondition} className='' ></Image>
                    </View>
                    <Text className='font-semibold text-lg'>2</Text>
                </View>
            </View>
        </View> 
    )
}