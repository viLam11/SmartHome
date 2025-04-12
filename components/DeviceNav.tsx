import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { IconSymbol } from './ui/IconSymbol';
import { useRouter, useLocalSearchParams } from 'expo-router';

type DeviceType = "light" | "fan" | "sensor";

// interface DeviceNavProps {
//     propps.status?: number;
//     id?: number;
//     feedId?: number;
//     type: DeviceType;
// }

export default function DeviceNav(props: {status: number, id: number, type: DeviceType }) {
    const router = useRouter();
    function hanldeNav(index: number) {
        if (index == props.status) return;
        switch (index) {
            case 1:
                if (props.type == "light") router.replace(`/devices/lights/${props.id}`);
                if (props.type == "fan") router.replace(`/devices/fans/${props.id}`);
                if (props.type == "sensor") router.replace(`/devices/sensors/${props.id}`);
                break;
            case 2:
                router.replace(`/hist/${props.id}`);
                break;
            case 3:
                router.replace(`/devices/stats/${props.id}`);
                break;
        }
    }
    return (
        <View>
            <View className='flex flex-row  justify-between mt-2 mx-6'>
                <View className={`w-1/ p-1 rounded-lg ${props.status == 1? 'bg-enable' : 'bg-disale'}`}>
                    <TouchableOpacity onPress={() => hanldeNav(1)}>
                        <Text className={`text-center font-semibold ${props.status == 1 ? 'color-black' : 'color-slate-600'}`}>Cài đặt</Text>
                    </TouchableOpacity>
                </View>
                <View className={`w-1/ p-1 rounded-lg ${props.status == 2 ? 'bg-enable' : 'bg-disale'}`}>
                    <TouchableOpacity onPress={() => {hanldeNav(2)}} >
                        <Text className={`text-center font-semibold ${props.status == 2 ? 'color-black' : 'color-slate-600'}`}>Lịch sử</Text>
                    </TouchableOpacity>
                </View>
                <View className={`w-1/ p-1 rounded-lg ${props.status == 3 ? 'bg-enable' : 'bg-disale'}`}>
                    <TouchableOpacity onPress={() => {hanldeNav(3)}} >
                        <Text className={`text-center font-semibold ${props.status == 3 ? 'color-black' : 'color-slate-600'}`}>Thống kê</Text> 
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}