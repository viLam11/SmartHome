import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';
import { TextInput } from 'react-native-gesture-handler';
import images from '@/constants/images';

export default function RoomImage({ setImageMode, setModal }) {


    return (
        <View className='w-full h-full'>
            <View className="flex items-end m-4 ">
                <TouchableOpacity onPress={() => setImageMode(false)} className='bg-black rounded-full'>
                    <IconSymbol name="close" color="white" />
                </TouchableOpacity>
            </View>

            <View className='w-11/12 mx-auto bottom-2 flex-grow'>
                <View className=''>
                    <View className="flex flex-row justify-between">
                        <Image source={images.home1}  style={{width: 150, height: 80}} resizeMode='contain'></Image>
                        <Image source={images.home1}  style={{width: 150, height: 80}} resizeMode='contain'></Image>
                    </View>
                    <View className="flex flex-row justify-between">
                        <Image source={images.home1}  style={{width: 150, height: 80}} resizeMode='contain'></Image>
                        <Image source={images.home1}  style={{width: 150, height: 80}} resizeMode='contain'></Image>
                    </View>
                    
                </View>
                <View>
                    <View className="bg-green-300 rounded-md mt-4 p-2 w-full mx-auto">
                        <TouchableOpacity onPress={() => setImageMode(true)}>
                            <Text className="text-black text-center font-bold">Xong</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="bg-gray-200 rounded-md mt-4 p-2 w-full mx-auto">
                        <TouchableOpacity onPress={() => {setImageMode(false); setModal(true)}}>
                            <Text className="text-black text-center font-bold">Quay lại</Text>
                        </TouchableOpacity>
                    </View>
                </View>
              
            </View>

        </View>
    );
}

const styles = StyleSheet.create({});
