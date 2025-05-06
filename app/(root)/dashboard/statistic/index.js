import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image } from 'react-native';
import { ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { getSummaryDeviceStatisticService, getDeviceKindUptimeService, getRoomsUptimeService, getRoomStatis, getAllRoomStat, totalHome } from '@/services/statisticService';
import { BarChartAnimated, PieChartAnimated } from '@/components/chart/BarChartAnimated';
import { useLoading } from '@/contexts/LoadingContext';
import { DatePickerModal, de } from 'react-native-paper-dates';
import ChooseCalendar from '@/components/chart/ChooseCalendar';
import Navigation from '@/components/Navigation';
import { deviceRatioWColorType, runningTimeDeviceType } from '@/types/statistic.type';
import { RoomObject } from '@/types/room.type';
import { getAllRoomService } from '@/services/roomService';
import images from '@/constants/images';
import { SelectDayRange } from '@/components/SelectDayRange';
import dayjs from 'dayjs';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { set } from 'date-fns';
import { getAllSensorSat } from '@/services/sensorService';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


const dumLineData = [
    { "dataPointText": "0", "label": "24/04", "value": 0 },
    { "dataPointText": "0", "label": "25/04", "value": 0 },
    { "dataPointText": "0", "label": "26/04", "value": 0 },
    { "dataPointText": "26.02", "label": "27/04", "value": 26.02 },
]

const dumLineData2 = [
    { "dataPointText": "12.2", "label": "24/04", "value": 12.2 },
    { "dataPointText": "14.1", "label": "25/04", "value": 14.1 },
    { "dataPointText": "30.2", "label": "26/04", "value": 30.2 },
    { "dataPointText": "26.02", "label": "27/04", "value": 26.02 },
]

const dumLineData3 = [
    { "dataPointText": "21.2", "label": "24/04", "value": 21.2 },
    { "dataPointText": "20.1", "label": "25/04", "value": 20.1 },
    { "dataPointText": "34.2", "label": "26/04", "value": 34.2 },
    { "dataPointText": "20.02", "label": "27/04", "value": 20.02 },
]

const dumPieData = [
    {
        value: 121,
        label: 'Device A',
        color: '#FF5733', // main color
        gradientCenterColor: '#C70039', // border color or gradient center
    },
    {
        value: 420,
        label: 'Device B',
        color: '#33FF57',
        gradientCenterColor: '#00C853',
    },
    {
        value: 567,
        label: 'Device C',
        color: '#3357FF',
        gradientCenterColor: '#2962FF',
    },
]


function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export default function StatisticMockUI() {
    const { setLoading } = useLoading();
    const [selectedDates, setSelectedDates] = useState({
        startDate: dayjs(),
        endDate: dayjs()
    });
    const [barData1, setBarData1] = useState([]);
    const [barData2, setBarData2] = useState([]);
    const [barData, setBarData] = useState([]);
    const [lineData1, setLineData1] = useState([]);
    const [lineData2, setLineData2] = useState([]);
    const [lineData3, setLineData3] = useState([]);
    const [options, setOptions] = useState([]);
    const [selectRoom, setSelectRoom] = useState(null);
    const [showOption, setShowOption] = useState(false);
    const [pieData, setPieData] = useState([]);
    const [initDates, setInitDates] = useState({
        startDate: dayjs(),
        endDate: dayjs()
    })
    const [maxLineY, setMaxLineY] = useState(300);

    function combineData(barData1, barData2) {
        if (!Array.isArray(barData1) || !Array.isArray(barData2)) {
            console.warn('combineData received undefined or non-array input', { barData1, barData2 });
            return []; // trả về mảng rỗng để tránh lỗi
        }
        const barDataCombined = [];
        const length = Math.min(barData1.length, barData2.length); // tránh lỗi nếu 1 trong 2 thiếu


        for (let i = 0; i < length; i++) {
            const item1 = barData1[i];
            const item2 = barData2[i];

            barDataCombined.push({
                value: item1.value,
                label: item1.label,
                dataPointText: String(item1.value),
                spacing: 8,
                labelWidth: 40,
                labelTextStyle: { color: 'gray', marginLeft: 4 },
                frontColor: item1.frontColor || '#177AD5',

            });

            barDataCombined.push({
                value: item2.value,
                frontColor: '#ED6665',
            });
        }
        return barDataCombined.slice(2);
    }

    useEffect(() => {
        const now = new Date();
        const vnDateStr = now.toLocaleDateString("en-CA", { timeZone: "Asia/Ho_Chi_Minh" });
        const vnMidnight = new Date(`${vnDateStr}T00:00:00+07:00`);
        const sevenDaysAgoVN = new Date(vnMidnight);
        sevenDaysAgoVN.setUTCDate(sevenDaysAgoVN.getUTCDate() - 7);
        const vnEndOfDay = new Date(`${vnDateStr}T23:59:59+07:00`);
        // console.log("7 days ago: " , sevenDaysAgoVN);
        // console.log("vnEndOfDay: " , vnEndOfDay);
        const fetchInitData = async () => {
            setLoading(true);
            const response = await getAllRoomStat(sevenDaysAgoVN.toISOString(), vnEndOfDay.toISOString());
            // console.log("RESPONSE: ", JSON.stringify(response.light), JSON.stringify(response.fan));
            setBarData1(response.light);
            setBarData2(response.fan);
            const allRoom = await getAllRoomService();
            console.log("allRoom: ", allRoom);
            setOptions([...allRoom, { id: -1, title: "Tất cả" }]);
            const sensorData = await getAllSensorSat(sevenDaysAgoVN.toISOString(), vnEndOfDay.toISOString());
            console.log("sensorData: ", sensorData);
            setLineData1(sensorData.temperature);
            setLineData2(sensorData.brightness);
            setLineData3(sensorData.humidity);
            const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

            const mainFeature = await totalHome({ startDate: sevenDaysAgoVN.toISOString(), endDate: vnEndOfDay.toISOString() });
            console.log("mainFeature: ", mainFeature);
            const newPieData = mainFeature.map((item) => {
                    return {
                        value: item.fanSum + item.lightSum,
                        label: item.roomName,
                        color: COLORS[index % COLORS.length],
                    }
                }
            );
            console.log("newPieData: ", newPieData);
            setPieData(newPieData);
            setLoading(false);
        }
        setInitDates({
            startDate: dayjs(sevenDaysAgoVN),
            endDate: dayjs(vnEndOfDay),
        })
        setSelectedDates({
            startDate: dayjs(sevenDaysAgoVN),
            endDate: dayjs(vnEndOfDay),
        })
        fetchInitData()
    }, [])

    useEffect(() => {
        if (!Array.isArray(barData1) || !Array.isArray(barData2)) {
            console.warn('useEffect received undefined or non-array input', { barData1, barData2 });
            return; // tránh lỗi nếu 1 trong 2 thiếu
        }
        const data = combineData(barData1, barData2);
        setBarData(data);
    }, [barData1, barData2]);

    async function choseRoomOption(room) {
        console.log("room: ", room);
        setSelectRoom(room);
        setShowOption(false);
        setLoading(true);
        let response;
        if (room.id === -1) {
            response = await getAllRoomStat(selectedDates.startDate.toISOString(), selectedDates.endDate.toISOString());
        } else {
            response = await getRoomStatis(room.id, selectedDates.startDate.toISOString(), selectedDates.endDate.toISOString());
        }
        setBarData1(response.light);
        setBarData2(response.fan);
        const data = combineData(response.light, response.fan);
        setBarData(data);
        setLoading(false);
    }

    async function handleSelectDate() {
        setLoading(true);
        const respose = await getAllRoomStat(selectedDates.startDate.toISOString(), selectedDates.endDate.toISOString());
        setBarData1(respose.light);
        setBarData2(respose.fan);
        let data = combineData(respose.light, respose.fan);
        setBarData(data);
        const sensorData = await getAllSensorSat(selectedDates.startDate.toISOString(), selectedDates.endDate.toISOString());
        setLineData1(sensorData.temperature);
        setLineData2(sensorData.brightness);
        setLineData3(sensorData.humidity);
        setLoading(false);
    }

    return (
        <View className="flex-1 bg-slate-100">
            <ScrollView showsVerticalScrollIndicator={false} className="flex-grow w-11/12 mx-auto mt-2">
                <View className="flex flex-row items-center baseline">
                    <View>
                        <Image source={images.statIcon} style={{ width: 60, height: 60 }} />
                    </View>
                    <View className=" rounded-md">
                        <Text className='text-2xl font-bold bg-yellow-100 p-2 rounded-lg'>Thống kê</Text>
                    </View>
                </View>

                <View className="mt-4">
                    <SelectDayRange selectedDates={selectedDates} setSelectedDates={setSelectedDates} onCancel={() => { }} onConfirm={handleSelectDate} />
                </View>

                <View className='bg-white mt-4 p-2 rounded-md'>
                    <View className='p-3'>
                        <View className="bg-gray-50 rounded-md w-32 flex flex-row justify-between items-center">
                            <Text className='text-lg ml-1'>{selectRoom ? selectRoom.title : "Tất cả"}</Text>
                            <View>
                                <TouchableOpacity onPress={() => setShowOption(!showOption)}>
                                    <IconSymbol name="down" />
                                </TouchableOpacity>
                            </View>
                            <View className={`${showOption ? 'absolute bg-white w-full top-8 z-10 px-2' : 'hidden'}`}>
                                {options.map((item, index) => {
                                    return (
                                        <View key={index} className='w-full mt-2'>
                                            <TouchableOpacity onPress={() => choseRoomOption(item)}>
                                                <Text className='text-lg'>{item.title}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    </View>
                    <View className='w-full'>
                        <Text className='font-bold text-lg text-center'>Biểu đồ thời gian sử dụng</Text>
                    </View>
                    <ScrollView horizontal={true} className="bg-white mt-2 py-2">
                        {barData.length > 0 && <BarChart
                            barWidth={20}
                            noOfSections={10}
                            data={barData}
                            width={Array.isArray(barData) ? Math.max(barData.length * 35, 300) : 300}
                            yAxisThickness={0}
                            xAxisThickness={0}
                            showValuesOnTopOfBars={true}
                            minWidthForValue={50}
                            valueTextStyle={{
                                color: 'black',
                                fontSize: 12,
                                fontWeight: 'bold',
                            }}
                            showValuesAsTopLabel={true}

                        />}
                    </ScrollView>
                    <View className="flex flex-row items-center bg-white">
                        <View className="flex flex-row mx-2 items-center">
                            <View className='bg-blue-500 w-4 h-4 mx-2'></View>
                            <Text>Đèn</Text>
                        </View>
                        <View className="flex flex-row items-center ">
                            <View className='bg-red-500 w-4 h-4 mx-2'></View>
                            <Text>Quạt</Text>
                        </View>
                    </View>
                </View>

                <View className='my-6 bg-white p-2 rounded-md'>
                    <View className='w-full'>
                        <Text className='text-center text-lg font-bold'>Biểu đồ thống kê cảm biến</Text>
                    </View>

                    <ScrollView horizontal={true} className="bg-white mt-2 py-2">
                        {lineData1.length > 0 && lineData2.length > 0 && lineData3.length > 0 && <LineChart
                            data={lineData1}
                            data2={lineData2}
                            data3={lineData3}
                            showVerticalLines
                            spacing={60}
                            initialSpacing={30}
                            color1="red"
                            color2="blue"
                            color3="green"
                            textColor1="red"
                            textColor2='blue'
                            textColor3='green'
                            dataPointsHeight={6}
                            dataPointsWidth={6}
                            dataPointsColor1="red"
                            dataPointsColor2="blue"
                            dataPointsColor3="green"
                            textShiftY={0}
                            textShiftX={5}
                            textFontSize={13}
                            stepValue={10}
                        />}
                    </ScrollView>
                    <View className="flex-row items-center p-4">
                        <View className="flex-row items-center mx-2">
                            <View className="w-4 h-4 bg-orange-500 rounded-full mr-2" />
                            <Text className="text-gray-700">Nhiệt độ</Text>
                        </View>
                        <View className="flex-row items-center mx-2">
                            <View className="w-4 h-4 bg-blue-500 rounded-full mr-2" />
                            <Text className="text-gray-700">Ánh sáng</Text>
                        </View>

                        <View className="flex-row items-center mx-2">
                            <View className="w-4 h-4 bg-green-500 rounded-full mr-2" />
                            <Text className="text-gray-700">Độ ẩm</Text>
                        </View>
                    </View>


                </View>


                <View className='mb-4'>
                    {pieData.length > 0 && <PieChartAnimated pieData={pieData} />}
                </View>
            </ScrollView>

            <View className='h-4'></View>

            <View className="h-14 bottom-2 w-full">
                <Navigation current={1} />
            </View>
        </View>
    );
}
