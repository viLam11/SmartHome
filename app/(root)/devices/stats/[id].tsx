import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DeviceHeader from '@/components/device/DeviceHeader';
import { getRunningTimeOneDeviceService, getTotaltimeOneDeviceService } from '@/services/statisticService';
import { runningTimeDeviceType } from '@/types/statistic.type';
import { useLoading } from '@/contexts/LoadingContext';
import Navigation from '@/components/Navigation';
import { BarChartAnimated } from '@/components/chart/BarChartAnimated';
import ChooseCalendar from '@/components/chart/ChooseCalendar';
import { currentTime, endDateData } from '@/constants/statistic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { caculateMostAndLeastActiveDevice } from '@/components/CaculateData';

export default function Statistic() {
  const feedId = useLocalSearchParams().id as string;
  const { setLoading } = useLoading();
  const [deviceData, setDeviceData] = useState<runningTimeDeviceType>({});
  const [deviceType, setDeviceType] = useState<string | null>(null);
  const [deviceTitle, setDeviceTitle] = useState<string | null>(null);
  const [runningTime, setRunningTime] = useState<string>("0");
  const [mostActive, setMostActive] = useState<string>("0");
  const [leastActive, setLeastActive] = useState<string>("0");
  const [endDate, setEndDate] = useState<Date>(endDateData);

  
  const outStand = [
    { key: "Total Run Time Of Device:", value: runningTime + " Hours" },
    { key: "Most Active Day:", value: mostActive },
    { key: "Least Active Day:", value: leastActive },
  ];

  const fetchDeviceSummary = async (feedId: string, endDate: Date) => {
    setLoading(true);
    try {
      const response = await getRunningTimeOneDeviceService(feedId, endDate);
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

  
  const fetchDeviceTotaltime = useCallback(
    async (feedId: string, endDate: Date) => {
      try {
        const deviceData = await getTotaltimeOneDeviceService(feedId, endDate);
        setRunningTime(deviceData.total.toString());
      } catch (err) {
        console.error('Error fetching device uptime:', err);
        setRunningTime('0');
      }
    },
    [deviceType, endDate]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (feedId && endDate) {
          await Promise.all([
            fetchDeviceSummary(feedId, endDate),
            fetchDeviceTotaltime(feedId, endDate)
          ]);
        }
      } catch (error) {
        console.error("Error in useEffect fetchData:", error);
      }
    };

    fetchData();
  }, [feedId, endDate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { mostActiveDevice, leastActiveDevice } = caculateMostAndLeastActiveDevice(deviceData.light || deviceData.fan);
        console.log("Most Active Device:", mostActiveDevice);
        setMostActive(mostActiveDevice);
        setLeastActive(leastActiveDevice);
      } catch (error) {
        console.error("Error in useEffect fetchData:", error);
      }
    };
    fetchData();
  }, [deviceData]);

  return (
    <View className="flex-1 bg-white">
      <ScrollView className='p-2'>
        <DeviceHeader
          status={3}
          feedId={+feedId}
          title={deviceData ? `${deviceType} ${deviceTitle}` : null}
        />
        <ChooseCalendar 
          endDate={endDate}
          setEndDate={setEndDate}
        />

        <BarChartAnimated roomOptions={[]} setRoomOptionBar={() => {}} barData={deviceData ?? {}} />

        <View className="w-full mt-4 bg-green-100 p-2 rounded-md shadow-lg">
        {outStand.map((item, index) => (
          <View key={index} className='flex flex-col items-center mt-2'>
            <Text className="text-sm">{item.key}</Text>
            <Text className='text-lg font-semibold'>{item.value}</Text>
          </View>
        ))}
        </View>

      </ScrollView>

      <View className="absolute bottom-2 w-full">
        <Navigation current={2} />
      </View>
    </View>
  );
}
