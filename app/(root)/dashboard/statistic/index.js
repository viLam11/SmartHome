import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image } from 'react-native';
import { ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { getSummaryDeviceStatisticService, getDeviceKindUptimeService, getRoomsUptimeService } from '@/services/statisticService';
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
import { BarChart } from 'react-native-gifted-charts';



export default function StatisticMockUI() {
    const [selectedDates, setSelectedDates] = useState({
        startDate: dayjs(),
        endDate: dayjs().add(2, 'day'),
    });

    return (
        <View className="flex-1 bg-slate-100">
            <ScrollView className="flex-grow w-11/12 mx-auto mt-2">
                <View className="flex flex-row items-center baseline">
                    <View>
                        <Image source={images.statIcon} style={{ width: 60, height: 60 }} />
                    </View>
                    <View className=" rounded-md">
                        <Text className='text-2xl font-bold bg-yellow-100 p-2 rounded-lg'>Thống kê</Text>
                    </View>
                </View>

            <View className="mt-4">
                <SelectDayRange selectedDates={selectedDates} setSelectedDates={setSelectedDates} onCancel={() => { }} onConfirm={() => { }} />
            </View>

            <ScrollView horizontal={true}>
                <BarChart 
                
                />
            </ScrollView>

            

            </ScrollView>

            <View className="h-14 bottom-2 w-full">
                <Navigation current={1} />
            </View>
        </View>
    );
}
