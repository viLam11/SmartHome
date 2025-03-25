import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Image, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconSymbol } from '@/components/ui/IconSymbol';
import images from '@/constants/images';
import Navigation from '@/components/Navigation';
import AddNewDevice from '@/components/AddNewDevice';
import { deviceListObject, DEVICE_FORMAT } from '@/types/device';
import { RoomObject } from '@/types/room';
import { getRoomDevices } from '@/services/deviceService';
import { getAllRoomService } from '@/services/roomService';

export default function Property() {
    const router = useRouter();
    const [room, setRoom] = useState<RoomObject | null>(null);
    const [deviceList, setDeviceList] = useState<deviceListObject | null>(null);
    const [deviceCount, setDeviceCount] = useState(0);
    const [editMode, setEditMode] = useState(false);
    const [modal, setModal] = useState(false);

    const roomId = useLocalSearchParams().id;

    useEffect(() => {
        if (!roomId) return;    
        (async () => {
            const response = await getRoomDevices(roomId as string);
            setDeviceList(response);
            const roomList = await getAllRoomService();
            const room = roomList.find((room: RoomObject) => room.id === Number(roomId));
            if (room) {
                setRoom(room);
                setDeviceCount((room.fanCount ?? 0) + (room.lightCount ?? 0) + (room.sensorCount ?? 0) + (room.doorCount ?? 0));
            } else {
                console.warn(`Room with ID ${roomId} not found`);
            }

        })();
    }, [roomId]); 
    
    // useEffect(() => {
    //     if (!deviceList) return;
    //     (async () => {
            
    //     })();
    // }, [deviceList]);

    return (
        <View className="min-h-screen">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="mt-1 mx-2 min-h-screen">
                {modal || editMode ? <View className="absolute top-0 left-0 z-10 w-full h-full bg-black/50" /> : null}

                <View className='flex flex-row justify-between'>
                    <View className="mx -2">
                        <TouchableOpacity onPress={() => { router.push(`/rooms/home`) }}>
                            <IconSymbol name="back" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text className="text-2xl font-bold">{room ? room.title : ""}</Text>
                    </View>
                    <View className="flex flex-row space-x-2">
                        {editMode ?
                            <View>
                                <TouchableOpacity className="bg-black rounded-full p-1" onPress={() => { }}>
                                    <IconSymbol name="save" size={18} color="white" />
                                </TouchableOpacity>
                            </View>
                            :
                            <> <View className="mr-2">
                                <TouchableOpacity className="bg-black rounded-full" onPress={() => {setModal(!modal)}}>
                                    <IconSymbol name="add" color="white" />
                                </TouchableOpacity>
                            </View>
                                <View>
                                    <TouchableOpacity className="bg-black rounded-full p-1" onPress={() => {setEditMode(!editMode) }}>
                                        <IconSymbol name="edit" size={18} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </>
                        }
                    </View>
                </View>

                <View className="my-4 overflow-hidden rounded-lg">
                    <ImageBackground source={images.home1} style={{ width: "100%", height: 120 }} resizeMode="cover">
                        <View className="p-3">
                            <Text className="text-2xl font-bold text-white">{room ? room.title : ""}</Text>
                            <Text className="text-white">{room ? deviceCount : '0'} thiết bị</Text>
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
                        <View className="bg-white h-2/4 w-full bottom-0 z-20 rounded-s-3xl">
                            <View>
                                <TouchableOpacity onPress={() => setModal(false)}>
                                    <Text>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                         <View className="bg-white h-1/2 w-full bottom-0 z-20 rounded-s-3xl">
                            <AddNewDevice setModal={setModal} room={room} />
                        </View>
                    )}
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
}
