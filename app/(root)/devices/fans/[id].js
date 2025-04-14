import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity , KeyboardAvoidingView, Platform} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import images from '@/constants/images';
import { useState, useEffect } from 'react';
import { Table, Row } from "react-native-table-component";
import DeviceNav from '@/components/DeviceNav';
import Navigation from '@/components/Navigation';
import SpinningFan from '@/components/SpinningFan';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const base_url = 'https://nearby-colleen-quanghia-3bfec3a0.koyeb.app/api/v1';

const renderCell = (data, index) => {
    if (index === 3) {
        // Nếu là cột "Edit", thêm button
        return (
            <TouchableOpacity onPress={() => alert("Xóa hàng này")}>
                <Text style={{ color: "red", textAlign: "center" }}>Xóa</Text>
            </TouchableOpacity>
        );
    }
    return <Text className='text-center'>{data}</Text>;
};
const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hourString = hours.toString().padStart(2, '0');

    return `${hourString}:${minutes} ${ampm}`;
};
export default function Fan() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [color, setColor] = useState("white");
    const [speed, setSpeed] = useState(0);
    const [status, setStatus] = useState(false);
    const [statusAuto, setSatusAuto] = useState(false);
    const [fanData, setFanData] = useState(null);
    const [token, setToken] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const [timer, setTimer] = useState(0);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [modal, setModal] = useState(false);
    const tableHead = ["Start", "End", "Brightness", "Edit"];
    const tableData = [
        ["17:00", "16:00", "nhẹ", ".."],
        ["20:00", "21:00", "nhẹ", ".."]
    ];
    useEffect(() => {
        const fetchToken = async () => {
            let t = await AsyncStorage.getItem("authToken")
            setToken(t)
        }
        fetchToken()
    }, [])
    useEffect(() => {
        console.log(token)
        const fetchCurrentStatus = async () => {
            const response = await axios.get(`${base_url}/devices/${id}`);
            setFanData(response.data)
            const fanTemp = response.data;
            if (fanTemp.value == 50) {
                setSpeed(150);
                setStatus(true);
            } else if (fanTemp.value == 75) {
                setSpeed(100);
                setStatus(true);
            } else if (fanTemp.value == 100) {
                setSpeed(25);
                setStatus(true);
            }
        }
        fetchCurrentStatus();
    }, [id]);

    async function handleFanSpeed(id, level) {
        if (!token) return
        try {
            const respone = await axios.post(`${base_url}/devices/${id}`, { value: level.toString() }, {
                headers: {
                    "Authorization": token
                }
            });

            if (level == 1) {
                setSpeed(150);
                setStatus(true);
            } else if (level == 2) {
                setSpeed(100);
                setStatus(true);
            } else if (level == 3) {
                setSpeed(25);
                setStatus(true);
            } else if (level == 0) {
                setSpeed(0);
                setStatus(false);
            }
        } catch (e) {
            console.log("Error: ", e);
        }
    }

    const onChange = (event, selectedTime) => {
        setShowPicker(false);
        if(timer == 0) {
            setStartTime(selectedTime);
        } else {
            setEndTime(selectedTime);
        }
    };

    return (

        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='min-h-screen flex-1 m-2'>
            <View className='flex flex-row justify-between'>
                <View className="mx -2">
                    <TouchableOpacity onPress={() => { router.back() }}>
                        <IconSymbol name="back" color="black" />
                    </TouchableOpacity>
                </View>
                <Text className='text-xl font-bold'>Quạt {+id}</Text>
                <View>
                </View>
            </View>
            <DeviceNav status={1} id={+id} type={"fan"} />

            <View className="flex flex-row mt-10">
                <View className='w-full h-80 '>
                    <SpinningFan speed={speed} />
                    <View className="flex flex-row items-center justify-center ">
                        <View className=' flex flex-row'>
                            {/* {status ? <Text className="px-2 w-20 font-semibold">Bật</Text> : <Text className="px-2 w-20 font-semibold">Tắt</Text>} */}
                            <TouchableOpacity onPress={() => { if (status) { handleFanSpeed(id, 0) } else { setStatus(true), handleFanSpeed(id, 1) } }}>
                                <Image source={status ? images.power : images.power} style={{ width: 46, height: 40 }} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => handleFanSpeed(id, 1)} className={`w-6 h-6 mx-1 rounded-full ${speed == 150 ? "bg-yellow" : "bg-gray-500"}  flex items-center justify-center`}>
                            <Text className="text-white">1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleFanSpeed(id, 2)} className={`w-6 h-6 mx-1 rounded-full ${speed == 100 ? "bg-yellow" : "bg-gray-500"}  flex items-center justify-center`}>
                            <Text className="text-white">2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleFanSpeed(id, 3)} className={`w-6 h-6 mx-1 rounded-full ${speed == 25 ? "bg-yellow" : "bg-gray-500"}  flex items-center justify-center`}>
                            <Text className="text-white">3</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>



            <View className='mx-2 mt-4 flex-grow'>
                <View className="flex flex-row">
                    <View className='w-40'>
                        <Text className="w-32 font-semibold">Tự động:  </Text>
                    </View>
                    <TouchableOpacity onPress={() => setSatusAuto(!statusAuto)}>
                        <Image source={statusAuto ? images.auto_on : images.auto_off} />
                    </TouchableOpacity>
                </View>

                <View>
                    <View className='flex flex-row justify-between'>
                        <Text className='font-semibold mt-4'>Hẹn giờ</Text>
                        <TouchableOpacity onPress={() => setModal(true)}>
                            <View className='bg-black rounded-full'>
                                <IconSymbol name="add" color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className='mt-2'>
                        <View style={{ borderWidth: 1, borderColor: "black", borderRadius: 10, overflow: "hidden" }}>
                            <Table borderStyle={{ borderWidth: 0 }}>
                                {/* Header */}
                                <Row
                                    data={tableHead}
                                    style={{
                                        height: 40,
                                        backgroundColor: "#FFD700",
                                        borderBottomWidth: 1,
                                        borderColor: "black",
                                    }}
                                    textStyle={{ textAlign: "center", fontWeight: "bold" }}
                                />
                                {/* Body */}
                                {tableData.map((rowData, rowIndex) => (
                                    <Row
                                        key={rowIndex}
                                        data={rowData.map((cell, cellIndex) => renderCell(cell, cellIndex))}
                                        style={{ height: 30 }}
                                        textStyle={{ textAlign: "center" }}
                                    />
                                ))}
                            </Table>
                        </View>
                    </View>
                </View>

                <View className='h-10'></View>
            </View>


            <View className="h-20">
                <View className=" bottom-6 w-full">
                    <Navigation current={2} />
                </View>
            </View>
            {modal && <Modal
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
                                <TouchableOpacity onPress={() => { setTimer(0); setShowPicker(true) }} className="bg-white p-3 rounded-lg shadow">
                                    <Text className='font-bold text-3xl'>{formatTime(startTime)}</Text>
                                </TouchableOpacity>
                            </View>
                            <Text className='font-bold text-3xl'>  -  </Text>
                            <View>
                                <TouchableOpacity onPress={() => { setTimer(1); setShowPicker(true) }} className="bg-white p-3 rounded-lg shadow">
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
        </ScrollView>
    )
}
