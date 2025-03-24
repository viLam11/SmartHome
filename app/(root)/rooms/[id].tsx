import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Image, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconSymbol } from '@/components/ui/IconSymbol';
import images from '@/constants/images';
import { room } from '@/constants/data';
import Navigation from '@/components/Navigation';
import { roomObject, deviceObject } from '@/types/device';
import { getRoomDevices } from '@/services/deviceService';
import AddNewDevice from '@/components/AddNewDevice';

const DEVICE_IMAGES: Record<string, any> = {
    fan: images.fan,
    light: images.lightbulb,
    sensor: images.aircondition,
};

export default function Property() {
    const router = useRouter();
    const { feedId } = useLocalSearchParams();
    const [roomData, setRoomData] = useState<roomObject | null>(null);
    const [deviceList, setDeviceList] = useState<deviceObject[] | null>(null);
    const [deviceCounts, setDeviceCounts] = useState<Record<string, number>>({});
    const [modal, setModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await getRoomDevices(feedId as string);
            setDeviceList(response);

            // Đếm số lượng từng loại thiết bị
            const counts = response.reduce((acc, { tittle }) => {
                acc[tittle] = (acc[tittle] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            setDeviceCounts(counts);
            setRoomData(room);
        })();
    }, [feedId]);

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
                    <ImageBackground source={roomData?.img} style={{ width: "100%", height: 120 }} resizeMode="cover">
                        <View className="p-3">
                            <Text className="text-2xl font-bold text-white">{roomData?.name}</Text>
                            <Text className="text-white">{deviceList?.length || 0} thiết bị</Text>
                        </View>
                    </ImageBackground>
                </View>

                <View className="flex flex-row flex-wrap">
                    {Object.keys(deviceCounts).map((tittle) => {
                        const image = DEVICE_IMAGES[tittle];
                        const filteredDevices = deviceList?.filter(device => device.tittle === tittle) || [];
                        const formattedTitle = tittle.charAt(0).toUpperCase() + tittle.slice(1);

                        return (
                            <View key={tittle} className="w-1/2">
                                <View className="bg-white m-2 p-2 rounded-lg">
                                    <View className="flex flex-row items-center">
                                        <Image source={image} style={{ width: 40, height: 40, tintColor: "#FFD700" }} />
                                        <View className="w-2/3">
                                            <Text className="ml-4 text-xl font-bold">{formattedTitle}</Text>
                                            <Text className="ml-4 text-gray-500">{filteredDevices.length} thiết bị</Text>
                                        </View>
                                    </View>
                                    <View className="mt-2">
                                        {filteredDevices.map((device, index) => (
                                            <TouchableOpacity key={index} onPress={() => router.push(`/devices/${tittle + "s"}/${device.feedId}`)}>
                                                <View className="w-2/3 mt-2 p-2 rounded-xl bg-disable">
                                                    <Text className="font-semibold">{device.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
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
