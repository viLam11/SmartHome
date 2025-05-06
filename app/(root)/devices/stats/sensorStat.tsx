import { LineChart, BarChart } from "react-native-gifted-charts"
import React from "react"
import { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native"
import axios from "axios";
import { fetchSensorDataByTime } from "@/services/sensorService";
import { DateTime } from "luxon";

export default function SensorStatis({sensorInfo, type, feedKey }: {sensorInfo: any, type: string, feedKey: string }) {
    const [lineData, setLineData] = useState([]);
    const [startTime, setStartTime] = useState<string | null>(null);
    const [textObj, setTextObj] = useState<{ [key: string]: string }>({})
    useEffect(() => {
        const vietnamMidnight = DateTime.now()
            .setZone("Asia/Ho_Chi_Minh")
            .startOf("day");
        const isoString = vietnamMidnight.toUTC().toISO();
        // console.log(">> VN midnight: ", vietnamMidnight.toString());
        // console.log(">> UTC ISO: ", isoString);
        setStartTime(isoString);
    }, [])

    useEffect(() => {
        if (!startTime) return;
        console.log("Start time: ", startTime);
        console.log("End time: ", new Date().toISOString());
        const fetchSensorData = async () => {
            let endTime = new Date().toISOString()
            const response = await fetchSensorDataByTime({ startTime, endTime, feedKey });
            console.log("Sensor data: ", response)
            setLineData(response);
        }

        fetchSensorData()
        const interval = setInterval(() => { fetchSensorData() }, 60000)
        return () => clearInterval(interval);
    }, [startTime])

    useEffect(() => {
        if (!sensorInfo) return;
        if (sensorInfo.type == "temperature") { 
            setTextObj({ typeName: "nhiệt độ", unit: "°C" })

        } else if (sensorInfo.type == "humidity") {
            setTextObj({ typeName: "độ ẩm", unit: "%" })    
        }
        else if (sensorInfo.type == "brightness") {
            setTextObj({ typeName: "độ sáng", unit: "lux" })
        }
    }, [sensorInfo])

    return (
        <View className="w-11/12 mx-auto">
            {lineData.length > 0 && (
                <>
                    <View className="mt-4">
                        <Text className="text-center text-lg font-bold ">Biểu đồ {textObj ? textObj.typeName : ""} hôm nay</Text>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
                        <LineChart
                            data={lineData}
                            height={250}
                            showVerticalLines
                            spacing={50}
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
                </>

            )}

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
            </View>
        </View>


    );
};