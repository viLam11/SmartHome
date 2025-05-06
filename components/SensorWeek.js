import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { useState, useEffect } from 'react';
import { fetchSensorDataByDay } from '@/services/sensorService';
import { SelectDayRange } from './SelectDayRange';
import { useLoading } from '@/contexts/LoadingContext';
import dayjs from 'dayjs';


const dumData = [{ "dataPointText": "0", "dataPointTextColor": "black", "hidden": true, "label": "24/04", "value": 0 }, { "dataPointText": "0", "dataPointTextColor": "black", "hidden": true, "label": "25/04", "value": 0 }, { "dataPointText": "0", "dataPointTextColor": "black", "hidden": true, "label": "26/04", "value": 0 }, { "dataPointText": "26.02", "dataPointTextColor": "black", "hidden": false, "label": "27/04", "value": 26.02 }, { "dataPointText": "26", "dataPointTextColor": "black", "hidden": false, "label": "28/04", "value": 26 }, { "dataPointText": "26", "dataPointTextColor": "black", "hidden": false, "label": "29/04", "value": 26 }, { "dataPointText": "26", "dataPointTextColor": "black", "hidden": false, "label": "30/04", "value": 26 }, { "dataPointText": "26", "dataPointTextColor": "black", "hidden": false, "label": "01/05", "value": 26 }, { "dataPointText": "26", "dataPointTextColor": "black", "hidden": false, "label": "02/05", "value": 26 }]
export default function SensorWeek({ feedId, sensorInfo }) {
    const { setLoading } = useLoading();
    const [isVisible, setIsVisible] = useState(false);
    const [lineData, setLineData] = useState(dumData);
    const [initDates, setInitDates] = useState({
        startDate: dayjs(),
        endDate: dayjs(),
    })
    const [selectedDates, setSelectedDates] = useState({
        startDate: dayjs(),
        endDate: dayjs(),
    });
    const [textObj, setTextObj] = useState({
        typeName: "",
        unit: ""
    })


    useEffect(() => {
        const now = new Date();
        const vnDateStr = now.toLocaleDateString("en-CA", { timeZone: "Asia/Ho_Chi_Minh" });
        const vnMidnight = new Date(`${vnDateStr}T00:00:00+07:00`);
        const sevenDaysAgoVN = new Date(vnMidnight);
        sevenDaysAgoVN.setUTCDate(sevenDaysAgoVN.getUTCDate() - 7);
        const vnEndOfDay = new Date(`${vnDateStr}T23:59:59+07:00`);
        const fetch7DaysData = async () => {
            const data = await fetchSensorDataByDay({ startTime: sevenDaysAgoVN.toISOString(), endTime: vnEndOfDay.toISOString(), feedId: +feedId });
            setLineData(data);
        }
        setInitDates({
            startDate: dayjs(sevenDaysAgoVN),
            endDate: dayjs(vnEndOfDay),
        })
        setSelectedDates({
            startDate: dayjs(sevenDaysAgoVN),
            endDate: dayjs(vnEndOfDay),
        })
        fetch7DaysData()
    }, [])

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


    function onCancel() {
        setSelectedDates(initDates);
        setIsVisible(false);
    }

    async function onConfirm() {
        console.log('Selected range:', selectedDates.startDate.format('DD MMM, YYYY'), '-', selectedDates.endDate.format('DD MMM, YYYY'));
        setLoading(true);
        const sensorData = await fetchSensorDataByDay({
            startTime: selectedDates.startDate.toISOString(),
            endTime: selectedDates.endDate.toISOString(),
            feedId: +feedId
        });
        console.log('SENSOR DATA 2:', sensorData);
        setLineData(sensorData);
        setLoading(false);
        setIsVisible(false);
    }

    return (
        <View className='w-11/12 mx-auto mt-4'>
            <Text className='text-center font-bold text-lg'>Biều đồ {textObj ? textObj.typeName : ""} theo ngày</Text>

            <SelectDayRange selectedDates={selectedDates} setSelectedDates={setSelectedDates} onCancel={onCancel} onConfirm={onConfirm} isVisible={isVisible} setIsVisible={setIsVisible} />

            <ScrollView horizontal={true} className="mt-4">
                <LineChart
                    data={lineData}
                    width={Math.max(lineData.length * 60, 300)}
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
                    style={{
                        'bottom-margin': 20,
                    }}
                />
            </ScrollView>
        </View>
    )

}