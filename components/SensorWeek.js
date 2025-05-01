import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useState, useEffect } from 'react';
import { fetchSensorDataByDay } from '@/services/sensorService';
import { SelectDayRange } from './SelectDayRange';

const dumData = [
    { value: 26.5, label: '10:00', dataPointText: '26.5' },
    { value: 27.2, label: '11:00', dataPointText: '27.2' }
]

export default function SensorWeek() {
    const [visible, setVisible] = useState(false);
    const [lineData, setLineData] = useState(dumData);

    useEffect(() => {
        const now = new Date();
        const vnDateStr = now.toLocaleDateString("en-CA", { timeZone: "Asia/Ho_Chi_Minh" });
        const vnMidnight = new Date(`${vnDateStr}T00:00:00+07:00`);
        const sevenDaysAgoVN = new Date(vnMidnight);
        sevenDaysAgoVN.setUTCDate(sevenDaysAgoVN.getUTCDate() - 7);
        const vnEndOfDay = new Date(`${vnDateStr}T23:59:59+07:00`);
        const fetch7DaysData = async () => {
            const data = await fetchSensorDataByDay({ startTime: sevenDaysAgoVN.toISOString(), endTime: vnEndOfDay.toISOString(), feedId: 3014285 });
            setLineData(data);
        }
        fetch7DaysData()
    }, [])

    return (
        <View className='w-11/12 mx-auto mt-4'>
            <Text className='text-center font-bold text-lg'>Biều đồ nhiệt theo ngày</Text>

            
            <SelectDayRange />

            <ScrollView horizontal={true}>
                <LineChart
                    data={lineData}
                    height={250}
                    showVerticalLines
                    spacing={60}
                    initialSpacing={20}
                    color1="blue"
                    textColor1="black"
                    dataPointsHeight={6}
                    dataPointsWidth={6}
                    dataPointsColor1="orange"
                    textShiftY={0}
                    textShiftX={0}
                    textFontSize={13}
                />
            </ScrollView>
        </View>
    )

}