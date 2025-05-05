import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

type DeviceType = "light" | "fan" | "sensor" | "door";

interface DeviceNavProps {
    status?: number;
    feedId?: number;
    type: DeviceType;
    roomId?: number;    
}

export default function DeviceNav({status, feedId, type, roomId }: DeviceNavProps) {
    const router = useRouter();
    // const [status, setStatus] = useState(1);
    function hanldeNav(index: number) {
        if (index == status) return;
        switch (index) {
            case 1:
                if (type == "light") router.replace(`/devices/lights/${feedId}`);
                if (type == "fan") router.replace(`/devices/fans/${feedId}`);
                if (type == "sensor") router.replace(`/devices/sensors/${feedId}`);
                if (type == "door") router.replace(`/devices/doors/${feedId}`);
                break;
            case 2:
                if (type == "sensor") router.replace({pathname: `/devices/stats/sensorStat`, params: {roomID: roomId}});
                router.replace(`/hist/${feedId}`);
                break;
            case 3:
                router.replace(`/devices/stats/${feedId}`);
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