import React from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, Modal, KeyboardAvoidingView, Platform, } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import DateTimePicker from '@react-native-community/datetimepicker';
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

const formatTime = (date: Date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hourString = hours.toString().padStart(2, '0');

    return `${hourString}:${minutes} ${ampm}`;
};

export default function Light() {
    const feedId = useLocalSearchParams().id;
    const [color, setColor] = useState("white");
    const [lightEnable, setLightEnable] = useState(false);
    const [statusAuto, setStatusAuto] = useState(true);
    const [status, setStatus] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [timer, setTimer] = useState(0);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [modal, setModal] = useState(false);
    const [deviceData, setDeviceData] = useState<deviceStatusObject | null>(null);
    const { setLoading } = useLoading();
    
    const controlLight = async (value : string) => {
        try {
            await controlDevice(feedId as string, value);
            setColor(value)
        } catch (error) {
            console.error("Error fetching device data:", error);
        }
    };

    async function powerLight(value: string) {
        try {            
            await controlDevice(feedId as string, value);
            setColor(value === "#000000" ? "#F2F2F2" : "white");
            setStatus(!status)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        if (!feedId) return;
        const fetchCurrentStatus = async () => {
            setLoading(true);
            try {
                const response = await getDeviceData(feedId as string);
                setDeviceData(response);
                setStatus(response.value === "#000000" ? false : true)
                if (response.value === "#000000") {
                    setColor("#F2F2F2")
                } else {
                    setColor(response.value)
                }
            } catch (error) {
                console.error("Error fetching device data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentStatus();
    }, [feedId]);

    const onChange = (event: any, selectedTime: Date) => {
        setShowPicker(false);
        if(timer == 0) {
            setStartTime(selectedTime);
        } else {
            setEndTime(selectedTime);
        }
    };

    return (
        <View className='flex-1'>
            <ScrollView className='mt-1 mx-2'>
                <DeviceHeader feedId={+feedId} title={deviceData ? `${deviceData.type} ${deviceData.title}` : null} />

                <View className='flex flex-row mt-4'>
                    <View className='w-1/2 '>
                        <View className='w-full h-72 flex items-center'>
                            <Image source={images.lamp} style={{ width: "70%", height: 200 }} />
                            <Image source={images.light} style={{ width: "50%", height: 100, tintColor: `${color}` }}></Image>
                        </View>
                    </View>
                    
                    <View className='w-1/2 flex flex-col items-end justify-center'>
                        <View className='w-40'>
                            <Text className="px-2 w-40 font-semibold"> {status ? "Bật" : "Tắt"}     </Text>
                        </View>
                        <PowerButton status={status} powerLight={powerLight} />
                        <View className='mt-4'>
                            <ColorSelector color={color} controlLight={controlLight} />
                        </View>
                    </View> 
                </View>

                <View className='mx-2 mt-4'>
                    <AutoToggle status={status} setStatusAuto={setStatusAuto} />
                    <DeviceTimerTable setModal={setModal} />
                </View>

            </ScrollView>
            <View className="absolute bottom-2 w-full">
                <Navigation current={2} />
            </View>
            {modal &&  <Modal
                animationType="slide"
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    setModal(false);
                }}
                className='bg-green-50 z-20'
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1, justifyContent: 'flex-end' }}
                >
                    <View className="bg-gray-400 h-44 w-full bottom-0 z-20 rounded-3xl my-auto p-2">
                        <View className='w-full flex flex-row justify-between items-center'>
                            <Text className='text-2xl font-bold m-2 text-gray-100'>Hẹn giờ</Text>
                            <TouchableOpacity onPress={() => setModal(false)}>
                            <IconSymbol name="close" color="white" className="absolute right-0 top-2" />
                            </TouchableOpacity>
                        </View>
                        <View className='flex flex-row items-center justify-center w-full mx-auto mt-6'>
                            <View>
                                <TouchableOpacity onPress={() =>{ setTimer(0); setShowPicker(true)}} className="bg-white p-3 rounded-lg shadow">
                                    <Text className='font-bold text-3xl'>{formatTime(startTime)}</Text>
                                </TouchableOpacity>
                            </View>
                            <Text className='font-bold text-3xl'>  -  </Text>
                            <View>
                                <TouchableOpacity onPress={() =>{ setTimer(1); setShowPicker(true)}} className="bg-white p-3 rounded-lg shadow">
                                    <Text className='font-bold text-3xl'>{formatTime(endTime)}</Text>
                                </TouchableOpacity>
                            </View>
                            {showPicker && (
                                <DateTimePicker
                                    value={timer == 0 ? startTime : endTime}
                                    mode="time"
                                    is24Hour={false}
                                    display="spinner"
                                    onChange={onChange}
                                />
                            )}
                        </View>
                </View>
            </KeyboardAvoidingView>
                    </Modal>
            }
        </View>
    )
}