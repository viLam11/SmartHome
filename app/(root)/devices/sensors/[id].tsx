import React from "react"
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native"
import { useState, useEffect } from "react"
import { useLocalSearchParams, useRouter } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import DeviceNav from "@/components/device/DeviceNav"
import Navigation from "@/components/Navigation"
import { IconSymbol } from "@/components/ui/IconSymbol"
import images from "@/constants/images"
import axios from "axios"
import Icons from "@/constants/icons"
import SensorStatis from "../stats/sensorStat"
const API_URL = process.env.EXPO_PUBLIC_API_URL
const imgTemp = [images.sun_cloud, images.day, images.night, images.sun_cloud, images.sun_humid, images.night_humid, images.night_snow, images.night_wind]
export default function Sensor() {
    const router = useRouter()
    const { id } = useLocalSearchParams()
    const [sensor, setSensor] = useState(null)
    const [roomId, setRoomId] = useState(1);
    const [currentTime, setCurrentTime] = useState<string | null>(null)
    const [currentDate, setCurrentDate] = useState<string | null>(null) 

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const date = now.getDate().toString().padStart(2, '0') + '/' + (now.getMonth() + 1).toString().padStart(2, '0') + '/' + now.getFullYear();
            setCurrentDate(date);
            console.log(date);
        }, 100)
        return () => clearInterval(interval)
    })
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const time = now.getHours().toString().padStart(2, '0') + ':' +
                        now.getMinutes().toString().padStart(2, '0') + ':' +
                        now.getSeconds().toString().padStart(2, '0');
            const result = `${time}`;
            setCurrentTime(result);
            console.log(result); 
        }, 100)
        return () => clearInterval(interval)
    }, [])

    return (

        <View className="flex-1">
            <ScrollView className="min-h-screen flex-1" >
                <View className='flex flex-row justify-between flex-grow'>
                    <View className="mx -2">
                        <TouchableOpacity onPress={() => { router.back() }}>
                            <IconSymbol name="back" color="black" />
                        </TouchableOpacity>
                    </View>
                    <Text className='text-xl font-bold'>Cảm biến {+id}</Text>
                    <View>
                    </View>
                </View>

                {/* <DeviceNav roomId={roomId} status={1} feedId={+id} type={"light"} /> */}

                {/* Nhiet do */}
                <View>
                    <View>
                        <Image source={images.sun_cloud} className="mx-auto" style={{ width: 240, height: 150 }} />
                    </View>
                    <Text className="text-center text-2xl font-bold">Nóng nhẹ</Text>
                    <Text className="text-center text-6xl font-bold m-2">31°C</Text>
                    <Text className="text-center italic">Vị trí: phòng khách</Text>
                    <Text className="text-center italic">Thời gian: {currentTime} {currentDate} </Text>
                </View>

                <SensorStatis />
                {/* Thong so */}
                {/* <View className="bg-blue-50 shadow-lg w-11/12 mx-auto mt-6 rounded-xl p-4">
                    <View>
                        <View className="flex flex-row justify-between ">
                            <View className="">
                                <View className="bg-white rounded-full p-2 m-2">
                                    <IconSymbol name="wind" color="#158cdb" size={40} />
                                </View>
                                <Text className="font-semibold text-gray-500 italic text-center">Ánh sáng</Text>
                                <Text className="font-bold text-xl text-center">9 km/h</Text>
                            </View>
                            <View className="">
                                <View className="bg-white rounded-full p-2 m-2">
                                    <IconSymbol name="humidity" color="#158cdb" size={40} />
                                </View>
                                <Text className="font-semibold text-center text-gray-500 italic">Độ ẩm</Text>
                                <Text className="font-bold text-xl text-center">90 %</Text>
                            </View>
                        </View>
                    </View>
                </View> */}

            </ScrollView>
            <View className="absolute bottom-2 w-full">
                <Navigation current={2} />
            </View>
        </View >
    )
}