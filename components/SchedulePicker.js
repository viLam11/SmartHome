import React from "react"
import { View, Text, Modal, KeyboardAvoidingView, TouchableOpacity, Platform } from "react-native"
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import {useState, useEffect} from 'react'
import { IconSymbol } from "./ui/IconSymbol";

const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hourString = hours.toString().padStart(2, '0');
    return `${hourString}:${minutes} ${ampm}`;
}



export default function SchedulePicker({setModal}) {
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false)
    const [timer, setTimer] = useState(0);

    
    const onChange = (event, selectedTime) => {
        setShowPicker(false);

        if (selectedTime) {
            if (timer == 0) {
                setStartTime(selectedTime);
            } else {
                setEndTime(selectedTime);
            }
        }
    };


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
    )
}