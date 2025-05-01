import { LineChart, BarChart } from "react-native-gifted-charts"
import React from "react"
import { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native"
import axios from "axios";
import { fetchSensorDataByTime } from "@/services/sensorService";

export default function SensorStatis() {
    const [lineData, setLineData] = useState([]);
    const [startTime, setStartTime] = useState<string | null>(null);
    const feedKey = "bbc-temp"

    useEffect(() => {
        const currentTime = new Date();
        const hour = currentTime.getHours();
        console.log("Current time: ", currentTime.toISOString())
        console.log("Month: ", currentTime.getMonth())
        let date;
        if (hour >= 7) {
            date = currentTime.getFullYear() + "-" + (currentTime.getMonth() ) + "-" + (currentTime.getUTCDate() - 1) + "T17:00:00Z";
            setStartTime(date);
        } else {
            date = currentTime.getFullYear() + "-" + (currentTime.getMonth() ) + "-" + (currentTime.getUTCDate()) + "T17:00:00Z";
            setStartTime(date);
        }
        console.log("Start time: ", date);
    }, [])

    useEffect(() => {
        if (!startTime) return;
        console.log("Start time: ", startTime);
        console.log("End time: ", new Date().toISOString());
        const fetchSensorData = async () => {
            let endTime = new Date().toISOString()
            const response = await fetchSensorDataByTime({startTime, endTime, feedKey} );
            console.log("Sensor data: ", response)
            setLineData(response);
        }
        
        fetchSensorData()
        const interval = setInterval(() => {   fetchSensorData() }, 60000)
        return () => clearInterval(interval);
    }, [startTime])

    return (
        <View className="w-11/12 mx-auto">
            <View className="mt-4">
                <Text className="text-center text-lg font-bold ">Biểu đồ nhiệt độ hôm nay</Text>
            </View>
            <ScrollView horizontal={true}>
                <LineChart
                    data={lineData}
                    height={250}
                    showVerticalLines
                    spacing={40}
                    initialSpacing={20}
                    color1="orange"
                    textColor1="black"
                    dataPointsHeight={6}
                    dataPointsWidth={6}
                    dataPointsColor1="red"
                    textShiftY={0}
                    textShiftX={0}
                    textFontSize={13}
                />
            </ScrollView>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
            </View>
        </View>


    );
};