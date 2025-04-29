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
import { SensorDataType } from "@/types/device.type"
import { fetchSensorData } from "@/services/deviceService"
import { useLoading } from "@/contexts/LoadingContext"

const API_URL = process.env.EXPO_PUBLIC_API_URL
const imgTemp = [images.sun_cloud, images.day, images.night, images.sun_cloud, images.sun_humid, images.night_humid, images.night_snow, images.night_wind]

const timeToSeconds = (time: string) => {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
};

export default function Sensor() {
    const router = useRouter()
    const id = useLocalSearchParams().id
    const {loading, setLoading}= useLoading()
    const [sensor, setSensor] = useState(null)
    const [roomId, setRoomId] = useState(1);
    const [currentTime, setCurrentTime] = useState<string | null>(null)
    const [currentDate, setCurrentDate] = useState<string | null>(null)
    const [sensorData, setSensorData] = useState<SensorDataType | null>(null)
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const date = now.getDate().toString().padStart(2, '0') + '/' + (now.getMonth() + 1).toString().padStart(2, '0') + '/' + now.getFullYear();
            setCurrentDate(date);
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
        }, 100)
        return () => clearInterval(interval)
    }, [])


    // FETCH SENSOR DATA
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const response : any = await fetchSensorData(2)
            const data : SensorDataType = {...response.data, image: null, message: null, unit: null};
            console.log("Sensor data 2: ", data)
            if (data.type == 'temperature') {
                data.unit = '°C'
                if (currentTime && timeToSeconds(currentTime) < timeToSeconds('10:00:00') && timeToSeconds(currentTime) > timeToSeconds('6:00:00')) {
                    if (data.value > 30) {
                        data.image = images.day
                        data.message = "Nóng"
                    } else if (data.value > 20) {
                        data.image = images.sun_cloud
                        data.message = "Mát mẻ" 
                    }
                } else {
                    if (data.value > 30) {  
                        data.image = images.night
                        data.message = "Nóng"
                    } else if (data.value > 20) {  
                        data.image = images.night_humid
                        data.message = "Mát mẻ"
                    }

                }
               
            }   

            setSensorData(data)
        }
        fetchData()
        setLoading(false)
    }, [])

    return (
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
                    {sensorData && sensorData.image  && <Image source={sensorData.image} className="mx-auto" style={{ width: 160, height: 100 }} />}
                </View>
                <Text className="text-center text-xl font-bold">{sensorData? sensorData.message : ''}</Text>
                <Text className="text-center text-4xl font-bold m-2"> {sensorData ? sensorData.value : ''} °C</Text>
                <Text className="text-center italic">Vị trí: phòng khách</Text>
                <Text className="text-center italic">Thời gian: {currentTime} {currentDate} </Text>
            </View>

            <SensorStatis />

            <View className=" bottom-0 w-full h-28">
                <Navigation current={2} />
            </View>
        </ScrollView>


    )
}