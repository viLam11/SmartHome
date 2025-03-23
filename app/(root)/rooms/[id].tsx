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

export default function Room() {
    const router = useRouter();
    const roomName = useState(["Phòng Khách", "Phòng Ngủ", "Phòng Bếp"]);
    const [waring, setWaring] = useState(false);
    const [room, setRoom] = useState(null);
    const { id } = useLocalSearchParams();
    const [editMode, setEditMode] = useState(false);
    const [modal, setModal] = useState(false);


    useEffect(() => {
        // alert(id);  
        let temp = rooms.filter(room => room.id == id);
        setRoom(temp[0]);
    }, []);

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
                        <Text className="text-2xl font-bold">{room ? room.name : ""}</Text>
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
                    <ImageBackground
                        source={images.home1}
                        style={{ width: "100%", height: 120, borderRadius: 12 }}
                        resizeMode="cover"
                    >
                        <View className="p-3">
                            <Text className="text-2xl font-bold text-white">{room ? room.name : ""}</Text>
                            <Text className="text-white">{room ? room.device : '0'} thiết bị</Text>
                        </View>
                    </ImageBackground>
                </View>

                <View className='flex flex-row '>
                    <View className='w-1/2 flex flex-col  '>
                        <View className="bg-white m-2 p-2 rounded-lg">
                            <View className="flex flex-row items-center">
                                <View className='w-1/3'>
                                    <Image source={images.fan} style={{ width: 40, height: 40, tintColor: (room && room.fan_on != 0) ? "#F5BA0B" : "black" }} />
                                </View>
                                <View className='w-2/3'>
                                    <Text className='ml-4 text-xl font-bold'>Quạt</Text>
                                    <Text className='ml-4 color-gray-500'>{room ? room.fan : '0'} thiết bị</Text>
                                </View>
                            </View>

                            <View className='mt-2'>
                                {Array.from({ length: room ? room.fan : 0 }).map((_, index) => (
                                    <View key={index} className="w-2/3 mt-2 bg-disable p-2 rounded-xl">
                                        <TouchableOpacity onPress={() => { router.push(`/fans/${id}`) }}>
                                            <Text className='font-semibold'>Quạt trần {index + 1}</Text>
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
                                    <Image source={images.lightbulb} style={{ width: 40, height: 40, tintColor: (room && room.light_on != 0) ? "#F5BA0B" : "black" }} />
                                </View>
                                <View className='w-2/3'>
                                    <Text className='ml-4 text-xl font-bold'>Đèn</Text>
                                    <Text className='ml-4 color-gray-500'>{room ? room.light : '0'} thiết bị</Text>
                                </View>
                            </View>

                            <View className='mt-2'>
                                {Array.from({ length: room ? room.light : 0 }).map((_, index) => (
                                    <View key={index} className="w-2/3 mt-2 bg-enable p-2 rounded-xl">
                                        <TouchableOpacity onPress={() => { router.push(`/lights/${id}`) }}>
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
                                    <Image source={images.aircondition} style={{ width: 40, height: 40, tintColor: (room && room.sensor_on != 0) ? "#F5BA0B" : "black" }} />
                                </View>
                                <View className='w-2/3'>
                                    <Text className='ml-4 text-xl font-bold'>Cảm biến</Text>
                                    <Text className='ml-4 color-gray-500'>{room ? room.sensor : '0'} thiết bị</Text>
                                </View>
                            </View>

                            <View className='mt-2'>
                                {Array.from({ length: 2 }).map((_, index) => (
                                    <View key={index} className="w-2/3 mt-2 bg-enable p-2 rounded-xl">
                                        <Text className='font-semibold'>Cảm biến {index + 1}</Text>
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
                            <Text>dfasdf</Text>
                            <View>
                                <TouchableOpacity onPress={() => setModal(false)}>
                                    <Text>Close</Text>
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

