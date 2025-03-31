import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Image, ImageBackground, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconSymbol } from '@/components/ui/IconSymbol';
import images from '@/constants/images';
import { room } from '@/constants/data';
import Navigation from '@/components/Navigation';
import { rooms } from '@/constants/data';
import AddNewDevice from '@/components/AddNewDevice';
import axios from 'axios';


export default function Property() {
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

    useEffect(() => {
        console.log("### ROOM ID: ", id);
        const fetchDeviceInRoom = async () => {
            const response = await axios.get(`${base_url}/devices/room/${id}`, {
                headers: {
                    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkQXQiOjE3NDM0ODI5OTQsInVzZXJJRCI6IjEifQ.9Gt8rqLKmePlnbc2MpkCofnGSK_gmf0WqoXlNuv75EE"
                }
            })
            if (response.status != 200) {
                console.log("### ERROR: ", response.data);  
            }
            // console.log("### DATA: ", response.data);
            setFanList(response.data.fanList);
            setLightList(response.data.lightList);
            setSensorList(response.data.sensorList);
            setDoorList(response.data.doorList);
            // console.log("## Fan list: ", fanList);
        }
        const fetchRoomData = async () => {
            const response = await axios.get(`${base_url}/rooms`, {
                headers: {
                    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkQXQiOjE3NDM0ODI5OTQsInVzZXJJRCI6IjEifQ.9Gt8rqLKmePlnbc2MpkCofnGSK_gmf0WqoXlNuv75EE"
                }
            })
            let room = response.data.find((room) => room.id == id);
            room = {...room, device: room.fanCount + room.lightCount + room.sensorCount + room.doorCount};  
            setRoom(room);
        }
        fetchDeviceInRoom();        
        fetchRoomData();
        const interval = setInterval(fetchDeviceInRoom, 5000);
        return () => clearInterval(interval);
        
    }, [modal, editMode]);

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
                    <ImageBackground source={roomData?.img || images.home1} style={{ width: "100%", height: 120 }} resizeMode="cover">
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
                                    <Text className='ml-4 color-gray-500'>{room ? room.fan : '0'} thiết bị</Text>
                                </View>
                            </View>

                            <View className='mt-2'>
                                {fanList.length > 0 && fanList.map((fan, index) => (
                                    <View key={index} className={`mt-2 ${fan.value == 0 ? "bg-disable": "bg-enable" } p-2 rounded-xl `}>
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
                                    <Text className='ml-4 color-gray-500'>{ lightList.length} thiết bị</Text>
                                </View>
                            </View>

                            <View className='mt-2'>
                                {lightList.length > 0 && lightList.map((light, index) => (
                                    <View key={index} className={`mt-2 ${light.value == "#000000" ? "bg-disable": "bg-enable" } p-2 rounded-xl `}>
                                        <TouchableOpacity onPress={() => { router.push(`/devices/lights/${light.feedId}`) }}>
                                            <Text className='font-semibold'>Đèn {light.title}</Text>
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
                                    <Image source={images.aircondition} style={{ width: 40, height: 40, tintColor: (room && room.sensor_on) ? "#F5BA0B" : "black" }} />
                                </View>
                                <View className='w-2/3'>
                                    <Text className='ml-4 text-xl font-bold'>Cảm biến</Text>
                                    <Text className='ml-4 color-gray-500'>{room ? room.sensor : '0'} thiết bị</Text>
                                </View>
                            </View>

                            <View className='mt-2'>
                                {sensorList.length > 0 && sensorList.map((sensor, index) => (
                                      <View key={index} className={`mt-2 ${sensor.value == 0 ? "bg-disable": "bg-enable" } p-2 rounded-xl `}>
                                      <TouchableOpacity onPress={() => { router.push(`/devices/sensors/${id}`) }}>
                                          <Text className='font-semibold'>Đèn trần {index + 1}</Text>
                                      </TouchableOpacity>
                                  </View>
                                ))}
                            </View>

                        </View>
                    </View>

                </View>
                <View className="absolute bottom-2 w-full">
                    <Navigation current={2} />
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
                    {editMode ?
                        <View className="bg-white h-2/4 w-full bottom-0 z-20 rounded-s-3xl">
                            <View>
                                <TouchableOpacity onPress={() => setModal(false)}>
                                    <Text>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    : 
                        <View className="bg-white h-1/2 w-full bottom-0 z-20 rounded-s-3xl">
                            <AddNewDevice setModal={setModal} room={roomData} />
                        </View>
                    }
                </KeyboardAvoidingView>
            </Modal>
        </View>

    );
}
