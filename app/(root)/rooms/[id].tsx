import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Image, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconSymbol } from '@/components/ui/IconSymbol';
import images from '@/constants/images';
import { room } from '@/constants/data';
import Navigation from '@/components/Navigation';
import { roomObject, deviceListObject, DEVICE_FORMAT } from '@/types/device';
import { getRoomDevices } from '@/services/deviceService';
import AddNewDevice from '@/components/AddNewDevice';


export default function Property() {
    const router = useRouter();
    
    const [roomData, setRoomData] = useState<roomObject | null>(null);
    const [deviceList, setDeviceList] = useState<deviceListObject | null>(null);
    const [deviceCounts, setDeviceCounts] = useState<Record<string, number>>({});
    const [modal, setModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const roomId = useLocalSearchParams().id;

    useEffect(() => {
        if (!roomId) return;
    
        (async () => {
            const response = await getRoomDevices(roomId as string);
            setDeviceList(response);
        })();
    }, [roomId]); 
    
    useEffect(() => {
        if (!deviceList) return;
            setDeviceCounts({
                door: deviceList.doorList.length,
                fan: deviceList.fanList.length,
                light: deviceList.lightList.length,
                sensor: deviceList.sensorList.length,
                all: deviceList.doorList.length + deviceList.fanList.length + deviceList.lightList.length + deviceList.sensorList.length,
            });
        setRoomData(room);
    }, [deviceList]);

    return (
        <View className="min-h-screen">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="mt-1 mx-2 min-h-screen">
                {modal || editMode ? <View className="absolute top-0 left-0 z-10 w-full h-full bg-black/50" /> : null}

                <View className="flex flex-row justify-between">
                    <TouchableOpacity onPress={() => router.push(`/rooms/home`)}>
                        <IconSymbol name="back" />
                    </TouchableOpacity>
                    <Text className="text-2xl font-bold">{roomData?.name}</Text>
                    <TouchableOpacity className="bg-black rounded-full w-8 h-8 flex items-center justify-center" onPress={() => setModal(!modal)}>
                        <IconSymbol name="add" color="white" />
                    </TouchableOpacity>
                </View>

                <View className="my-4 overflow-hidden rounded-lg">
                    <ImageBackground source={roomData?.img || images.home1} style={{ width: "100%", height: 120 }} resizeMode="cover">
                        <View className="p-3">
                            <Text className="text-2xl font-bold text-white">{roomData?.name}</Text>
                            <Text className="text-white">{deviceCounts.all} thiết bị</Text>
                        </View>
                    </ImageBackground>
                </View>

                <View className="flex flex-row flex-wrap">
                    {deviceList && Object.entries(deviceList).map(([key, devices]) => {
                        const image = DEVICE_FORMAT[key]['img'];
                        const amount = devices.length;
                        const devicesRouter = DEVICE_FORMAT[key]['router'];
                        const displayTittle = DEVICE_FORMAT[key]['displayTittle'];

                        return (
                            <View key={key} className="w-1/2">
                                <View className="bg-white m-2 p-2 rounded-lg">
                                    <View className="flex flex-row items-center">
                                        <Image source={image} style={{ width: 40, height: 40, tintColor: "#FFD700" }} />
                                        <View className="w-2/3">
                                            <Text className="ml-4 text-xl font-bold">{displayTittle}</Text>
                                            <Text className="ml-4 text-gray-500">{amount} thiết bị</Text>
                                        </View>
                                    </View>
                                    <View className="mt-2">
                                        {devices.map((device, index) =>{ 
                                            return (
                                            <TouchableOpacity key={index} onPress={() => router.push(`/${devicesRouter}/${roomId}`)}>
                                                <View className="w-full mt-2 p-2 rounded-xl bg-disable">
                                                    <Text className="font-semibold">{device.title}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )})}
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>

            <View className="absolute bottom-2 w-full">
                <Navigation current={2} />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal || editMode}
                onRequestClose={() => {
                    setModal(false);
                    setEditMode(false);
                }}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1, justifyContent: 'flex-end' }}
                >
                    {editMode ? (
                        <View className="bg-white h-2/4 w-full bottom-0 z-20 rounded-s-3xl p-4">
                            <Text className="text-center text-lg font-bold">Chỉnh sửa phòng</Text>
                            <TouchableOpacity onPress={() => setEditMode(false)}>
                                <Text className="text-center text-red-500 mt-4">Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View className="bg-white h-1/2 w-full bottom-0 z-20 rounded-s-3xl">
                            <AddNewDevice setModal={setModal} room={roomData} />
                        </View>
                    )}
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}
