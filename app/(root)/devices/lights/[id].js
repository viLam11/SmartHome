import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Modal, KeyboardAvoidingView, Platform, Button } from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import DateTimePicker from '@react-native-community/datetimepicker';
import images from '@/constants/images';
import { useState, useEffect } from 'react';
import { Table, Row } from "react-native-table-component";
import DeviceNav from '@/components/DeviceNav';
import Navigation from '@/components/Navigation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScheduleTable from '@/components/ScheduleTable';

const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hourString = hours.toString().padStart(2, '0');

    return `${hourString}:${minutes} ${ampm}`;
};

export default function Light() {
    const router = useRouter();
    const base_url = 'https://nearby-colleen-quanghia-3bfec3a0.koyeb.app/api/v1';
    const { id } = useLocalSearchParams();
    const [color, setColor] = useState("white");
    const [statusAuto, setSatusAuto] = useState(true);
    const [status, setStatus] = useState(false);
    const [token, setToken] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const [timer, setTimer] = useState(0);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [modal, setModal] = useState(false);
    const [lightData, setLightData] = useState(null);
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

    async function powerLight(value) {
        if (!token) return
        try {
            const response = await axios.post(`${base_url}/devices/${id}`, { value: value }, {
                headers: {
                    "Authorization": token
                }
            })
            if (value === "#000000") {
                setColor("#F2F2F2")
            } else {
                setColor("white")
            }
            console.log(response.data)
            setStatus(!status)
        } catch (error) {
            console.log(error)
        }

    }

    async function controlLight(value) {
        try {
            const response = await axios.post(`${base_url}/devices/${id}`, { value: value }, {
                headers: {
                    "Authorization": token
                }
            })
            console.log(response)
            setColor(value)
            // setStatus(value === 1 ? true : false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log("Light ID:", id);
        const fetchCurrentStatus = async () => {
            try {
                axios.get(`${base_url}/devices/${id}`)
                    .then((response) => {
                        const data = response.data;
                        setLightData(data);
                        console.log("Light data: ", data)
                        setStatus(data.value === "#000000" ? false : true)
                        if (data.value === "#000000") {
                            setColor("#F2F2F2")
                        } else {
                            setColor(data.value)
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error)
            }
        }
        fetchCurrentStatus();
        // const interval = setInterval(fetchCurrentStatus, 5000);
        // return () => clearInterval(interval);

    }, [])

    const onChange = (event, selectedTime) => {
        setShowPicker(false);
        if(timer == 0) {
            setStartTime(selectedTime);
        } else {
            setEndTime(selectedTime);
        }
    };

    
    return (
        <View className='flex-1'>
            <ScrollView className={`mt-1 mx-2`}>
                <View className='flex flex-row justify-between'>
                    <View className="mx -2">
                        <TouchableOpacity onPress={() => { router.back() }}>
                            <IconSymbol name="back" />
                        </TouchableOpacity>
                    </View>
                    <Text className='text-xl font-bold'>Đèn {+id}</Text>
                    <View>
                    </View>
                </View>

                <DeviceNav current={1} id={+id} type={"light"} />


                <View className='flex flex-row mt-4'>
                    <View className='w-1/2 '>
                        <View className='w-full flex items-center'>
                            <Image source={images.lamp} style={{ width: "70%", height: 200 }} />
                            <Image source={images.light} style={{ width: "50%", height: 100, tintColor: `${color}` }}></Image>
                        </View>

                    </View>
                    <View className='w-1/2 flex flex-col items-end justify-center'>
                        <View className='w-40'>
                            <Text className="px-2 w-40 font-semibold"> {status ? "Bật" : "Tắt"}     </Text>
                        </View>
                        <TouchableOpacity onPress={() => { if (status) { powerLight("#000000") } else { powerLight("#F2F2F2") } }}>
                            <Image source={status ? images.auto_on : images.auto_off} />
                        </TouchableOpacity>
                        <View >
                            <View className='mt-4 flex flex-row justify-center items-center'>
                                <TouchableOpacity onPress={() => controlLight("#3C82F6")}>
                                    <View className={`rounded-full mx-2 bg-blue-500  ${color === "#3C82F6" ? "w-8 h-8" : "w-4 h-4"}`}></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => controlLight("white")}>
                                    <View className={`rounded-full mx-2 bg-white  ${color === "white" ? "w-8 h-8" : "w-4 h-4"}`}></View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => controlLight("#FFD700")}>
                                    <View className={`rounded-full mx-2 bg-yellow  ${color === "#FFD700" ? "w-8 h-8" : "w-4 h-4"}`}></View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </View>

                <View className='mx-2 mt-4'>
                    <View className="flex flex-row">
                        <View className='w-40'>
                            <Text className="px-2 w-40 font-semibold">Tự động:     </Text>
                        </View>
                        <TouchableOpacity onPress={() => setSatusAuto(!status)}>
                            <Image source={status ? images.auto_on : images.auto_off} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View className='flex flex-row justify-between'>
                            <Text className='font-semibold mt-4'>Hẹn giờ</Text>
                            <TouchableOpacity className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black items-center justify-center z-50" onPress={() => {setModal(true); console.log("Modal", modal)}}>
                                <View className='bg-black rounded-full'>
                                    <IconSymbol name="add" color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View className='mt-2'>
                            <ScheduleTable tableData={tableData} />
                        </View>
                    </View>
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
           
        </View >
    )
}