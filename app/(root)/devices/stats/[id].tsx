import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DeviceHeader from '@/components/device/DeviceHeader';
import { getStatisticService } from '@/services/statisticService';
import { runningTimeDeviceType, runningTimeOneDeviceType } from '@/types/statistic.type';
import { useLoading } from '@/contexts/LoadingContext';
import Navigation from '@/components/Navigation';
import { BarChartAnimated } from '@/components/chart/BarChartAnimated';
import ChooseCalendar from '@/components/chart/ChooseCalendar';
import { DatePickerModal } from 'react-native-paper-dates';
import { currentTime } from '@/constants/statistic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

export default function Statistic() {
  const feedId = useLocalSearchParams().id;
  const { setLoading } = useLoading();
  const [deviceData, setDeviceData] = useState<runningTimeDeviceType | null>(null);
  const [deviceType, setDeviceType] = useState<string | null>(null);
  const [deviceTitle, setDeviceTitle] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  

  const fetchStatistic = async (id: string, endDate: Date | null) => {
    setLoading(true);
    try {
      const response = await getStatisticService(id, endDate);
      // console.log('transformedData', transformedData);
      const fetchedDeviceType = await AsyncStorage.getItem('deviceType');
      const fetchedDeviceTitle = await AsyncStorage.getItem('deviceTitle');
      
      if (fetchedDeviceType) {
        setDeviceType(fetchedDeviceType);
        setDeviceTitle(fetchedDeviceTitle);
        
        const transformedData = {
          [String(fetchedDeviceType)]: Object.entries(response).reduce((acc: { [date: string]: number }, [key, value]: [string, number]) => {
        acc[key] = value;
        return acc;
          }, {})
        };
        setDeviceData(transformedData);
      } else {
        console.warn("Device type is null, skipping data transformation.");
      }
    } catch (error) {
      console.error("Error fetching device data:", error);
    } finally {
      setLoading(false);
    }
  };


  
  useEffect(() => {
    if (!feedId) return;
    fetchStatistic(feedId as string, null);
  }, [feedId]);

  useEffect(() => {
    if (feedId && endDate) {
      fetchStatistic(feedId as string, endDate);
    }
  }, [endDate]);

  const onDismiss = () => {
    setOpen(false);
  };
  
  const onConfirm = ({ date }: { date: Date | undefined }) => {
    const newEnd = dayjs(date).endOf('day').toDate();
  
    setEndDate(newEnd);
    setOpen(false);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <DeviceHeader
          status={3}
          feedId={+feedId}
          title={deviceData ? `${deviceType} ${deviceTitle}` : null}
        />
        <ChooseCalendar 
          startDate={deviceData ? Object.keys(deviceData[Object.keys(deviceData)[0]])[0] : null} 
          endDate={deviceData ? Object.keys(deviceData[Object.keys(deviceData)[0]]).slice(-1)[0] : null} 
          setOpen={setOpen} 
        />
        
        <View className="flex flex-col w-9/12 mt-4 mx-auto p-1 bg-white justify-center items-center">
         <Text className="text-2xl color-black">{currentTime.hour} Giờ, {currentTime.minute} Phút</Text>
         <Text className="text-lg color-black-200">{currentTime.dayOfWeek}, {currentTime.day} {currentTime.month}</Text>
        </View>
        <BarChartAnimated setRoom={() => {}} barData={deviceData ?? {}} />
      </ScrollView>

      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismiss}
        date={endDate ?? new Date()}
        onConfirm={onConfirm}
        validRange={{ endDate: dayjs().subtract(2, 'day').toDate() }}
      />


      <View className="absolute bottom-2 w-full">
        <Navigation current={2} />
      </View>
    </View>
  );
}
