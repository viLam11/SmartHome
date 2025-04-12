import React from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import images from '@/constants/images';
import { useState, useEffect } from 'react';
import DeviceHeader from '@/components/device/DeviceHeader';
import Navigation from '@/components/Navigation';
import { getDeviceData, controlDevice } from '@/services/deviceService';
import { deviceStatusObject } from '@/types/device.type';
import PowerButton from '@/components/device/PowerButton';
import ColorSelector from '@/components/device/ColorSelector';
import AutoToggle from '@/components/device/AutoToggle';
import DeviceTimerTable from '@/components/device/DeviceTimerTable';
import { useLoading } from '@/contexts/LoadingContext';

export default function Light() {
    const feedId = useLocalSearchParams().id;
    const [color, setColor] = useState("white");
    const [lightEnable, setLightEnable] = useState(false);
    const [statusAuto, setStatusAuto] = useState(true);
    const [deviceData, setDeviceData] = useState<deviceStatusObject | null>(null);
    const { setLoading } = useLoading();
    
    const controlLight = async () => {
        try {
            await controlDevice(feedId as string, "None", true);
            setLightEnable(!lightEnable);
        } catch (error) {
            console.error("Error fetching device data:", error);
        }
    };
    useEffect(() => {
        if (!feedId) return;
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getDeviceData(feedId as string);
                setDeviceData(response);
            } catch (error) {
                console.error("Error fetching device data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [feedId]);

    return (
        <View className='flex-1'>
            <ScrollView className='mt-1 mx-2'>
                <DeviceHeader feedId={+feedId} title={deviceData ? `${deviceData.type} ${deviceData.title}` : null} />

                <View className='flex flex-row mt-4'>
                    <View className='w-1/2 '>
                        <View className='w-full h-72 flex items-center'>
                            <Image source={images.lamp} style={{ width: "70%", height: 200 }} />
                            { lightEnable ? 
                                <Image source={images.light} style={{ width: "50%", height: 100, tintColor: `${color}` }}></Image> : null}
                        </View>
                    </View>
                    
                    <View className='w-1/2 flex flex-col items-end justify-center'>
                        <PowerButton onPress={controlLight} />
                        <View className='mt-4'>
                            <ColorSelector color={color} onChange={setColor} />
                        </View>
                    </View> 
                </View>

                <View className='mx-2 mt-4'>
                    <AutoToggle enabled={statusAuto} onToggle={() => setStatusAuto(!statusAuto)} />
                    <DeviceTimerTable />
                </View>

            </ScrollView>
            <View className="absolute bottom-2 w-full">
                <Navigation current={2} />
            </View>
        </View>
    )
}