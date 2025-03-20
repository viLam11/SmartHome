import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function DeviceNav({ current = 1, id = 1, type }) {
    const router = useRouter();
    function hanldeNav(index) {
        if (index == current) return;
        switch (index) {
            case 1:
                if (type == "light") router.replace(`/lights/${id}`);
                if (type == "fan") router.replace(`/fans/${id}`);
                break;
            case 2:
                router.replace(`/hist/${id}`);
                break;
            case 3:
                router.replace(`/stats/${id}`);
                break;
        }
    }
    return (
        <View>
            <View className='flex flex-row  justify-between mt-2 mx-6'>
                <View className={`w-1/ p-1 rounded-lg ${current == 1? 'bg-enable' : 'bg-disale'}`}>
                    <TouchableOpacity onPress={() => hanldeNav(1)}>
                        <Text className={`text-center font-semibold ${current == 1 ? 'color-black' : 'color-slate-600'}`}>Cài đặt</Text>
                    </TouchableOpacity>
                </View>
                <View className={`w-1/ p-1 rounded-lg ${current == 2 ? 'bg-enable' : 'bg-disale'}`}>
                    <TouchableOpacity onPress={() => {hanldeNav(2)}} >
                        <Text className={`text-center font-semibold ${current == 2 ? 'color-black' : 'color-slate-600'}`}>Lịch sử</Text>
                    </TouchableOpacity>
                </View>
                <View className={`w-1/ p-1 rounded-lg ${current == 3 ? 'bg-enable' : 'bg-disale'}`}>
                    <TouchableOpacity onPress={() => {hanldeNav(3)}} >
                        <Text className={`text-center font-semibold ${current == 3 ? 'color-black' : 'color-slate-600'}`}>Thống kê</Text> 
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}