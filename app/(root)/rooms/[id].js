import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Modal, StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { IconSymbol } from '@/components/ui/IconSymbol';
import images from '@/constants/images';
import Navigation from '@/components/Navigation';
import { rooms } from '@/constants/data';
import AddNewDevice from '@/components/AddNewDevice';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// type Fan = {
//     title: string;
//     feedId: number;
//     id: number;
//     name: string;
//     value: number;
// };

// type Light = {
//     id: number;
//     name: string;
//     value: number;
// };

// type Sensor = {
//     id: number;
//     name: string;
//     value: number;
// };

export default function Room() {
    const router = useRouter();
    const roomName = useState(["Phòng Khách", "Phòng Ngủ", "Phòng Bếp"]);
    const [waring, setWaring] = useState(false);
    const [room, setRoom] = useState(null);
    const [fanList, setFanList] = useState([]);
    const [lightList, setLightList] = useState([]);
    const [sensorList, setSensorList] = useState([]);
    const [doorList, setDoorList] = useState([]);
    const { id } = useLocalSearchParams();
    const [editMode, setEditMode] = useState(false);
    const [modal, setModal] = useState(false);
    const base_url = 'https://nearby-colleen-quanghia-3bfec3a0.koyeb.app/api/v1';
    const [token, setToken] = useState(null);    
    const [isTokenLoaded, setIsTokenLoaded] = useState(false);

    useEffect(() => {
        const fetchToken = async () => {
            const token = await AsyncStorage.getItem("authToken");
            setToken(token);
            setIsTokenLoaded(true);
        }
        fetchToken();
        setEditMode(false);
    }, []);

    useEffect(() => {
        if (!isTokenLoaded) return;
        console.log("### ROOM ID: ", id);
        const fetchDeviceInRoom = async () => {
            const response = await axios.get(`${base_url}/devices/room/${id}`)
            console.log("fetch device in room: ", response);   
            if (response.status != 200) {
                console.log("### ERROR: ", response.data);
            }
            console.log("### DATA: ", response.data);
            setFanList(response.data.fanList);
            setLightList(response.data.lightList);
            setSensorList(response.data.sensorList);
            setDoorList(response.data.doorList);
            console.log("## Fan list: ", fanList);
        }
        fetchDeviceInRoom();
        const fetchRoomData = async () => {
            const response = await axios.get(`${base_url}/rooms`, {
                headers: {
                    "Authorization": token
                }
            })
            console.log("fetch room data: ", response); 
            let room = response.data.find((room) => room.id == id);
            room = { ...room, device: room.fanCount + room.lightCount + room.sensorCount + room.doorCount };
            setRoom(room);
        }
        fetchRoomData();
    }, [modal, editMode, token]);


    if (!token) return
    return (
        <View className="min-h-screen">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='mt-1 mx-2 min-h-screen'>
                {modal || editMode ? <View className="absolute top-0 left-0 z-10 w-full h-full bg-black/50" /> : <></>}

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
                                <TouchableOpacity className="bg-black rounded-full" onPress={() => { setModal(!modal) }}>
                                    <IconSymbol name="add" color="white" />
                                </TouchableOpacity>
                            </View>
                                <View>
                                    <TouchableOpacity className="bg-black rounded-full p-1" onPress={() => { setEditMode(!editMode) }}>
                                        <IconSymbol name="edit" size={18} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </>
                        }
                    </View>
                </View>
                <View className="my-4 overflow-hidden rounded-lg">
                    <ImageBackground
                        source={images.home1}
                        style={{ width: "100%", height: 120, borderRadius: 12 }}
                        resizeMode="cover"
                    >
                        <View className="p-3">
                            <Text className="text-2xl font-bold text-white">{room ? room.title : ""}</Text>
                            <Text className="text-white">{room ? room.device : '0'} thiết bị</Text>
                        </View>
                    </ImageBackground>
                </View>

                <View className='flex flex-row '>
                    <View className='w-1/2 flex flex-col  '>
                        <View className="bg-white m-2 p-2 rounded-lg">
                            <View className="flex flex-row items-center">
                                <View className='w-1/3'>
                                    <Image source={images.fan} style={{ width: 40, height: 40, tintColor: (room && room.fan_on) ? "#F5BA0B" : "black" }} />
                                </View>
                                <View className='w-2/3'>
                                    <Text className='ml-4 text-xl font-bold'>Quạt</Text>
                                    <Text className='ml-4 color-gray-500'>{room ? fanList.length : 0} thiết bị</Text>
                                </View>
                            </View>

                            <View className='mt-2'>
                                {fanList.length > 0 && fanList.map((fan, index) => (
                                    <View key={index} className={`mt-2 ${fan.value == 0 ? "bg-disable" : "bg-enable"} p-2 rounded-xl `}>
                                        <TouchableOpacity onPress={() => { router.push(`/devices/fans/${fan.feedId}`) }}>
                                            <Text className='font-semibold'>Quạt {fan.title}</Text>
                                        </TouchableOpacity>

                                    </View>
                                ))}
                            </View>

                        </View>
                    </View>

                    <View className='w-1/2 flex flex-col  '>
                        <View className="bg-white m-2 p-2 rounded-lg">
                            <View className="flex flex-row items-center">
                                <View className='w-1/3'>
                                    <Image source={images.lightbulb} style={{ width: 40, height: 40, tintColor: (room && room.light_on) ? "#F5BA0B" : "black" }} />
                                </View>
                                <View className='w-2/3'>
                                    <Text className='ml-4 text-xl font-bold'>Đèn</Text>
                                    <Text className='ml-4 color-gray-500'>{lightList.length} thiết bị</Text>
                                </View>
                            </View>

                            <View className='mt-2'>
                                {lightList.length > 0 && lightList.map((light, index) => (
                                    <View key={index} className={`mt-2 ${light.value == "#000000" ? "bg-disable" : "bg-enable"} p-2 rounded-xl `}>
                                        <TouchableOpacity onPress={() => { router.push(`/devices/lights/${light.feedId}`) }}>
                                            <Text className='font-semibold'>Đèn trần {index + 1}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>

                        </View>
                    </View>

                </View>

                <View className='flex flex-row '>

                    <View className='w-1/2 flex flex-col  '>
                        <View className="bg-white m-2 p-2 rounded-lg">
                            <View className="flex flex-row items-center">
                                <View className='w-1/3'>
                                    <Image source={images.sensor} style={{ width: 40, height: 40 , opacity: 0.8, tintColor: (room && room.sensor_on) ? "#F5BA0B" : "black" }} />
                                </View>
                                <View className='w-2/3'>
                                    <Text className='ml-4 text-xl font-bold'>Cảm biến</Text>
                                    <Text className='ml-4 color-gray-500'>{ sensorList.length} thiết bị</Text>
                                </View>
                            </View>

                            <View className='mt-2'>
                                {sensorList.length > 0 && sensorList.map((sensor, index) => (
                                    <View key={index} className="w-2/3 mt-2 bg-enable p-2 rounded-xl">
                                        <Text className='font-semibold'>Cảm biến {sensor.title}</Text>
                                    </View>
                                ))}
                            </View>

                        </View>
                    </View>
                    <View className='w-1/2 flex flex-col  '>
                        <View className="bg-white m-2 p-2 rounded-lg">
                            <View className="flex flex-row items-center">
                                <View className='w-1/3'>
                                    <Image source={images.door} style={{ width: 40, height: 40 , opacity: 0.8, tintColor: (room && room.door_on > 0) ? "#F5BA0B" : "black" }} />
                                </View>
                                <View className='w-2/3'>
                                    <Text className='ml-4 text-xl font-bold'>Cửa</Text>
                                    <Text className='ml-4 color-gray-500'>{ doorList.length} thiết bị</Text>
                                </View>
                            </View>

                            <View className='mt-2'>
                                {doorList.length > 0 && doorList.map((door, index) => (
                                    <View key={index} className="mt-2 bg-enable p-2 rounded-xl">
                                        <TouchableOpacity onPress={() => { router.push(`/devices/doors/${door.feedId}`) }}> 
                                            <Text className='font-semibold'>{door.title}</Text>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>

                        </View>
                    </View>

                </View>
                <View className="absolute bottom-2 w-full h-24">
                    <Navigation current={2} />
                </View>
            </ScrollView>


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
                    {editMode ?
                        <View className="bg-white h-2/4 w-full bottom-0 z-20 rounded-s-3xl">
                            <View>
                                <TouchableOpacity onPress={() => { setEditMode(false) }} className="absolute top-2 right-2">
                                    <Text>Close hhhhh</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View className="bg-white h-1/2 w-full bottom-0 z-20 rounded-s-3xl">
                            <AddNewDevice setModal={setModal} room={room} />
                        </View>
                    }
                </KeyboardAvoidingView>
            </Modal>
        </View>

    );
}

const styles = StyleSheet.create({})