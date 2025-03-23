import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';
import { useRouter, useLocalSearchParams } from 'expo-router';

type DeviceType = "light" | "fan" | "sensor";

interface DeviceNavProps {
    status?: number;
    feedID?: number;
    type: DeviceType;
}

export default function DeviceNav({ status = 1, feedID = 1, type }: DeviceNavProps) {
    const router = useRouter();
    function hanldeNav(index: number) {
        if (index == status) return;
        switch (index) {
            case 1:
                if (type == "light") router.replace(`/devices/lights/${feedID}`);
                if (type == "fan") router.replace(`/devices/fans/${feedID}`);
                if (type == "sensor") router.replace(`/sensors/${feedID}`);
                break;
            case 2:
                router.replace(`/hist/${feedID}`);
                break;
            case 3:
                router.replace(`/stats/${feedID}`);
                break;
        }
    }
    return (
        <View>
            <View className='flex flex-row  justify-between mt-2 mx-6'>
                <View className={`w-1/ p-1 rounded-lg ${status == 1? 'bg-enable' : 'bg-disale'}`}>
                    <TouchableOpacity onPress={() => hanldeNav(1)}>
                        <Text className={`text-center font-semibold ${status == 1 ? 'color-black' : 'color-slate-600'}`}>Cài đặt</Text>
                    </TouchableOpacity>
                </View>
                <View className={`w-1/ p-1 rounded-lg ${status == 2 ? 'bg-enable' : 'bg-disale'}`}>
                    <TouchableOpacity onPress={() => {hanldeNav(2)}} >
                        <Text className={`text-center font-semibold ${status == 2 ? 'color-black' : 'color-slate-600'}`}>Lịch sử</Text>
                    </TouchableOpacity>
                </View>
                <View className={`w-1/ p-1 rounded-lg ${status == 3 ? 'bg-enable' : 'bg-disale'}`}>
                    <TouchableOpacity onPress={() => {hanldeNav(3)}} >
                        <Text className={`text-center font-semibold ${status == 3 ? 'color-black' : 'color-slate-600'}`}>Thống kê</Text> 
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}