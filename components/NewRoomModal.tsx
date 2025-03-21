import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';
import { TextInput } from 'react-native-gesture-handler';

export default function NewRoomModal({ setModal, setImageMode }) {


    return (
        <View className='w-full h-full'>
            <View className="flex items-end m-4 ">
                <TouchableOpacity onPress={() => setModal(false)} className='bg-black rounded-full'>
                    <IconSymbol name="close" color="white" />
                </TouchableOpacity>
            </View>

            <View className='w-11/12 mx-auto flex-col flex-grow'>
                <View className='h-1/2'>
                    <Text className='font-bold text-2xl mb-2'>Tên phòng</Text>
                    <TextInput
                        className="border border-gray-300 p-3 min-w-80 w-full rounded-md mx-auto"
                        placeholder="Nhập tên phòng..."
                        keyboardType="default"
                    />
                </View>
                <View className="bg-green-300 rounded-md mt-4 p-2 w-full mx-auto">
                    <TouchableOpacity onPress={() => setImageMode(true)}>
                        <Text className="text-black text-center font-bold">Tiếp tục</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({});
