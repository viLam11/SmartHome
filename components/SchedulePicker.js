import React from "react"
import { View, Text, Modal, KeyboardAvoidingView, TouchableOpacity, Platform } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react'
import { IconSymbol } from "./ui/IconSymbol";
import { setSchedule } from "@/services/scheduleService";
import { LoadingProvider } from "@/contexts/LoadingContext";

const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hourString = hours.toString().padStart(2, '0');
    return `${hourString}:${minutes} ${ampm}`;
}

export default function SchedulePicker({ setModal, feedID }) {
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date())
    const [timer, setTimer] = useState(0);
    const [scheduleLevel, setScheduleLevel] = useState(0)
    const [showPicker, setShowPicker] = useState(false)
    const [scheduleDays, setScheduleDays] = useState([])
    const onChange = (event, selectedTime) => {
        setShowPicker(false);
        if (timer == 0) {
            setStartTime(selectedTime);
        } else {
            setEndTime(selectedTime);
        }
    };

    function handleScheduleDays(day) {
        let temp = [2, 3, 4, 5, 6, 7, 8]
        if (!temp.includes(day)) return
        if (scheduleDays.includes(day)) {
            setScheduleDays(scheduleDays.filter(item => item !== day));
        } else {
            setScheduleDays([...scheduleDays, day]);
        }
    }

    async function handleSetSchedule() {
        console.log("check schedule time: ", startTime)
        let time = formatTime(startTime);
        time = time.split(" ")[0] + ":00";
        let days = [];
        days = scheduleDays.map((item) => {
            if (item == 2) return "Mon"
            if (item == 3) return "Tue"
            if (item == 4) return "Wed"
            if (item == 5) return "Thu"
            if (item == 6) return "Fri"
            if (item == 7) return "Sat"
            if (item == 8) return "Sun"
        })
        let Sdays = ""
        for (let x of days) { Sdays += x + ',' }
        Sdays = Sdays.substring(0, Sdays.length - 1)

        const payload = {
            deviceId: +feedID,
            action: scheduleLevel.toString(),
            scheduledTime: time,
            repeatDays: Sdays
        }
        console.log("payload: ", payload)
        const response = await setSchedule(payload)
        console.log("check response: ", response)
        if (response.status == 200) {
            alert("Thêm lịch thành công")
            setModal(false);
        }

    }

    // useEffect(() => {
    //     const fetchToken = async () => {
    //         setToken(await AsyncStorage.getItem("authToken"))
    //     }
    //     fetchToken()
    //     console.log("START TIME: ", startTime)
    // }, [])

    return (
        <Modal
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
                <View className="bg-gray-400 h-54 w-full bottom-0 z-20 rounded-3xl my-auto p-2">
                    <View className='w-full flex flex-row justify-between items-center'>
                        <Text className='text-2xl font-bold m-2 text-gray-50'>Hẹn giờ</Text>
                        <View className='flex flex-row'>
                            <TouchableOpacity onPress={() => handleSetSchedule()}>
                                <Text className='text-black font-bold bg-white p-2 mx-4'>Lưu</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModal(false)}>
                                <IconSymbol name="close" color="white" className="absolute right-0 top-2" />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View className='flex flex-row items-center justify-center w-full mx-auto mt-6'>
                        <View>
                            <TouchableOpacity onPress={() => { setTimer(0); setShowPicker(true) }} className="bg-white p-3 rounded-lg shadow">
                                <Text className='font-bold text-3xl'>{formatTime(startTime)}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <Text className='font-bold text-3xl'>  -  </Text>
                            <View>
                                <TouchableOpacity onPress={() => { setTimer(1); setShowPicker(true) }} className="bg-white p-3 rounded-lg shadow">
                                    <Text className='font-bold text-3xl'>{formatTime(endTime)}</Text>
                                </TouchableOpacity>
                            </View> */}
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
                    <View className='w-full flex flex-row mt-2'>
                        <Text className='text-lg font-bold text-white text-left ' >Mức độ:</Text>
                        <TouchableOpacity onPress={() => setScheduleLevel(1)}>
                            <Text className={` rounded-full mx-2 h-8 w-8 items-center text-center font-bold ${(scheduleLevel == 1) ? 'bg-yellow' : 'bg-white'} `}>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setScheduleLevel(2)}>
                            <Text className={` rounded-full mx-2 h-8 w-8 items-center text-center font-bold ${(scheduleLevel == 2) ? 'bg-yellow' : 'bg-white'} `}>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setScheduleLevel(3)}>
                            <Text className={` rounded-full mx-2 h-8 w-8 items-center text-center font-bold ${(scheduleLevel == 3) ? 'bg-yellow' : 'bg-white'} `}>3</Text>
                        </TouchableOpacity>
                    </View>
                    <View className='w-full flex flex-row mt-2'>
                        <Text className='text-lg font-bold text-white text-left ' >Ngày lặp lại:</Text>
                        <TouchableOpacity onPress={() => handleScheduleDays(2)}>
                            <Text className={` rounded-full mx-2 h-8 w-8 items-center text-center font-bold ${(scheduleDays.includes(2)) ? 'bg-yellow' : 'bg-white'} `}>T2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleScheduleDays(3)}>
                            <Text className={` rounded-full mx-2 h-8 w-8 items-center text-center font-bold ${(scheduleDays.includes(3)) ? 'bg-yellow' : 'bg-white'} `}>T3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleScheduleDays(4)}>
                            <Text className={` rounded-full mx-2 h-8 w-8 items-center text-center font-bold ${(scheduleDays.includes(4)) ? 'bg-yellow' : 'bg-white'} `}>T4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleScheduleDays(5)}>
                            <Text className={` rounded-full mx-2 h-8 w-8 items-center text-center font-bold ${(scheduleDays.includes(5)) ? 'bg-yellow' : 'bg-white'} `}>T5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleScheduleDays(6)}>
                            <Text className={` rounded-full mx-2 h-8 w-8 items-center text-center font-bold ${(scheduleDays.includes(6)) ? 'bg-yellow' : 'bg-white'} `}>T6</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleScheduleDays(7)}>
                            <Text className={` rounded-full mx-2 h-8 w-8 items-center text-center font-bold ${(scheduleDays.includes(7)) ? 'bg-yellow' : 'bg-white'} `}>T7</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleScheduleDays(8)}>
                            <Text className={` rounded-full mx-2 h-8 w-8 items-center text-center font-bold ${(scheduleDays.includes(8)) ? 'bg-yellow' : 'bg-white'} `}>CN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>)
}