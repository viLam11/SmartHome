import React, { useEffect, useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native';
import { getRunningTimeAllDeviceService, getDeviceKindTotaltimeService, getRoomsUptimeService } from '@/services/statisticService';
import { BarChartAnimated } from '@/components/chart/BarChartAnimated';
import { useLoading } from '@/contexts/LoadingContext';
import ChooseCalendar from '@/components/chart/ChooseCalendar';
import Navigation from '@/components/Navigation';
import { endDateData } from '@/constants/statistic';
import { deviceRatioWColorType, runningTimeDeviceType } from '@/types/statistic.type';
import { getAllRoomService } from '@/services/roomService';
import { Outstanding } from '@/components/chart/OutStanding';
import { formatPieData } from '@/components/CaculateData';

export default function StatisticSummary() {
  const { setLoading } = useLoading();
  const [deviceType, setDeviceType] = useState<{ title: string, value: string}>({ title: 'All devices', value: '-1' });
  const [roomOptionBar, setRoomOptionBar] = useState<{ title: string; id: number }>({ title: 'All rooms', id: -1 });
  const [deviceData, setDeviceData] = useState<runningTimeDeviceType | null>(null);
  const [runningTime, setRunningTime] = useState<string>("");
  const [deviceRatio, setDeviceRatio] = useState<deviceRatioWColorType[]>([]);
  const [endDate, setEndDate] = useState<Date>(endDateData);
  const [roomOptions, setRoomOptions] = useState<{ title: string; id: number }[]>([]);
  
  const fetchDeviceSummary = useCallback(
    async (roomOptionBar: { title: string; id: number }, endDate: Date) => {
      try {
        const deviceRunningTime = await getRunningTimeAllDeviceService(roomOptionBar.id, endDate);
        setDeviceData(deviceRunningTime);
      } catch (err) {
        console.error('Error fetching device summary:', err);
        setDeviceData(null);
      }
    },
    [roomOptionBar, endDate]
  );

  const fetchDeviceTotaltime = useCallback(
    async (deviceType: { title: string, value: string}, endDate: Date) => {
      try {
        const deviceData = await getDeviceKindTotaltimeService(deviceType.value, endDate);
        setRunningTime(deviceData.total.toString());
      } catch (err) {
        console.error('Error fetching device uptime:', err);
        setRunningTime('0');
      }
    },
    [deviceType, endDate]
  );

  const fetchRoomsUptime = useCallback(
    async (roomOptionData : { title: string; id: number }[], deviceType: {title: string, value: string}, endDate: Date) => {
      try {
        const roomsUptime = await getRoomsUptimeService(deviceType.value, endDate);
        const sortedRoomsUptime = formatPieData(roomsUptime)
        const formatRoomsUptime = sortedRoomsUptime.map(([roomId, value], index) => {
          const room = roomOptionData.find((roomOption) => roomOption.id === +roomId);
          return {
            label: room ? room.title : "Unknown Room",
            value,
            color: ['#009FFF', '#93FCF8', '#BDB2FA', '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9D4EDD'][index % 8],
            gradientCenterColor: ['#006DFF', '#3BE9DE', '#8F80F3', '#FF4C4C', '#FFC300', '#4CAF50', '#1E90FF', '#7B2CBF'][index % 8],
          };
        });
        setDeviceRatio(formatRoomsUptime);
      } catch (err) {
        console.error('Error fetching rooms uptime:', err);
        setDeviceRatio([]);
      }
    },
    [deviceType, endDate]
  );
  
  const fetchStatistic = useCallback(
    async (roomsOptionData : { title: string; id: number }[], roomOptionBar: { title: string; id: number }, deviceType: { title: string, value: string}, endDate: Date) => {
      await Promise.all([fetchDeviceSummary(roomOptionBar, endDate), fetchDeviceTotaltime(deviceType, endDate), fetchRoomsUptime( roomsOptionData, deviceType, endDate)]);
    },
    [fetchDeviceSummary, fetchDeviceTotaltime, fetchRoomsUptime]
  );

  const fetchRoomData = async () => {
    try {
      const response = await getAllRoomService();
      if (!response) throw new Error("Failed to fetch image");
      const data = response.map((roomOption) => ({ title: roomOption.title, id: roomOption.id }));
      const updatedData = [{ title: 'All rooms', id: -1 }, ...data];
      setRoomOptions(updatedData);
      setRoomOptionBar({ title: response[0].title, id: response[0].id });
      return data;
    } catch (error) {
      console.error("Error fetching roomOption data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const roomsOptionData = await fetchRoomData();
        if (!roomsOptionData) return;
        await fetchStatistic(roomsOptionData, roomOptionBar, deviceType, endDateData);
      } catch (error) {
        console.error('Error in fetchData:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (endDate) {
      fetchDeviceSummary(roomOptionBar, endDate);
    }
  }, [roomOptionBar, endDate]);

  useEffect(() => {
    const fetchData = async () => {
      if (endDate) {
        if (roomOptions.length === 0) return;
        await Promise.all([fetchDeviceTotaltime(deviceType, endDate), fetchRoomsUptime(roomOptions, deviceType, endDate)]);
      }
    };
    fetchData();
  }, [deviceType, endDate]);

  return (
    <View className="flex-1 bg-slate-100">
      <ScrollView className='p-2'>
        <View className='flex flex-row justify-center'>
          <View className='w-1/2 bg-yellow p-1 rounded-xl shadow-md'>
            <Text className="text-2xl font-bold text-center">Statistics </Text>
          </View>
        </View>

        <ChooseCalendar 
          endDate={endDate}
          setEndDate={setEndDate} 
        />

        <BarChartAnimated roomOptions={roomOptions} setRoomOptionBar={setRoomOptionBar} barData={deviceData ?? {}} />
        <Outstanding runningTime={runningTime} deviceRatio={deviceRatio} setDeviceType={setDeviceType} />

      </ScrollView>
      
      <View className="absolute bottom-2 w-full">
        <Navigation current={2} />
      </View>
    </View>
  );
}
