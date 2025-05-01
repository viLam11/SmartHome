import React, { useEffect, useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { getSummaryDeviceStatisticService, getDeviceKindUptimeService, getRoomsUptimeService } from '@/services/statisticService';
import { BarChartAnimated, PieChartAnimated } from '@/components/chart/BarChartAnimated';
import { useLoading } from '@/contexts/LoadingContext';
import { DatePickerModal, de } from 'react-native-paper-dates';
import ChooseCalendar from '@/components/chart/ChooseCalendar';
import Navigation from '@/components/Navigation';
import dayjs from 'dayjs';
import { deviceRatioWColorType, runningTimeDeviceType } from '@/types/statistic.type';
import { RoomObject } from '@/types/room.type';
import { getAllRoomService } from '@/services/roomService';


const typeOptions = ['light', 'fan', 'All'];

export default function StatisticMockUI() {
  const { setLoading } = useLoading();
  const [selectedType, setSelectedType] = useState('All');
  const [deviceType, setDeviceType] = useState('light');
  const [room, setRoom] = useState('All');
  const [allRoomData, setAllRoomData] = useState<RoomObject[]>([]);
  const [deviceData, setDeviceData] = useState<runningTimeDeviceType | null>(null);
  const [runningTime, setRunningTime] = useState<string>("");
  const [deviceRatio, setDeviceRatio] = useState<deviceRatioWColorType[]>([]);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchDeviceSummary = useCallback(
    async ( endDate: Date | null) => {
      try {
        const deviceRunningTime = await getSummaryDeviceStatisticService(room, endDate);
        setDeviceData(deviceRunningTime);
      } catch (err) {
        console.error('Error fetching device summary:', err);
        setDeviceData(null);
      }
    },
    [room]
  );

  const fetchDeviceUptime = useCallback(
    async (deviceType: string, endDate: Date | null) => {
      try {
        const deviceData = await getDeviceKindUptimeService(room, deviceType, endDate);
        setRunningTime(deviceData.total.toString());
      } catch (err) {
        console.error('Error fetching device uptime:', err);
        setRunningTime('0');
      }
    },
    [room]
  );

  const fetchRoomsUptime = useCallback(
    async (deviceType: string, endDate: Date | null) => {
      try {
        const roomsUptime = await getRoomsUptimeService(room, deviceType, endDate);
        setDeviceRatio(
          roomsUptime.deviceRatioType.map((item, index) => ({
            ...item,
            color: ['#009FFF', '#93FCF8', '#BDB2FA'][index % 3],
            gradientCenterColor: ['#006DFF', '#3BE9DE', '#8F80F3'][index % 3],
          }))
        );
      } catch (err) {
        console.error('Error fetching rooms uptime:', err);
        setDeviceRatio([]);
      }
    },
    [room]
  );
  
  const fetchStatistic = useCallback(
    async (deviceType: string, endDate: Date | null) => {
      await Promise.all([fetchDeviceSummary(endDate), fetchDeviceUptime(deviceType, endDate), fetchRoomsUptime(deviceType, endDate)]);
    },
    [fetchDeviceSummary, fetchDeviceUptime, fetchRoomsUptime]
  );

  const fetchRoomData = async () => {
    try {
      const response = await getAllRoomService();
      if (!response) throw new Error("Failed to fetch image");
      setAllRoomData(response);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchRoomData(), fetchStatistic(deviceType, null)]);
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
      fetchStatistic(deviceType, endDate);
    }
  }, [deviceType, endDate]);


  const outStand = [
    { key: "Run time:", value: runningTime + " Hours" },
    { key: "Most used:", value: deviceRatio[0]?.label },
    { key: "Least used:", value: deviceRatio[1]?.label },
  ];

  
  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setDeviceType?.(type);
    setShowDropdown(false);
  };

  const onConfirm = ({ date }: { date: Date | undefined }) => {
    const newEnd = dayjs(date).endOf('day').toDate();  
    setEndDate(newEnd);
    setPickerVisible(false);
  };

  return (
    <View className="flex-1 bg-slate-100">
      <ScrollView className='p-2'>
        <View className='flex flex-row justify-center'>
          <View className='w-1/2 bg-yellow p-1 rounded-xl shadow-md'>
            <Text className="text-2xl font-bold text-center">Statistics </Text>
          </View>
        </View>
        

        <ChooseCalendar 
          startDate={deviceData ? Object.keys(deviceData[deviceType] ?? {})[0] : null} 
          endDate={deviceData ? Object.keys(deviceData[deviceType] ?? {})[Object.keys(deviceData[deviceType] ?? {}).length - 1] : null} 
          setOpen={setPickerVisible} 
        />

        <BarChartAnimated setRoom={setRoom} barData={deviceData ?? {}} />
        <View className='flex flex-row justify-between items-center mt-10'>
          <View className='w-1/2 ml-3'>
            <Text className="text-xl font-semibold">Outstanding</Text>
          </View>

          <Pressable onPress={() => {setShowDropdown(true)}} className='w-1/2 border-2 border-sky-300 shadow rounded-md p-1 flex justify-center items-center'>
            <Text className="text-sm text-gray-500 font-semibold">{selectedType} ▼</Text>
          </Pressable>
          

        </View>
        
        <View className='flex flex-col px-2 mb-20'>
          <View className="w-full mt-4 bg-sky-100 p-2 rounded-md shadow-lg">
            {outStand.map((item, index) => (
              <View key={index} className='flex flex-col items-center mt-2'>
                <Text className="text-sm">{item.key}</Text>
                <Text className='text-lg font-semibold'>{item.value}</Text>
              </View>
            ))}
          </View>
          <PieChartAnimated pieData={deviceRatio} />
        </View>

      </ScrollView>

      <DatePickerModal
        locale="en"
        mode="single"
        visible={isPickerVisible}
        onDismiss={() => setPickerVisible(false)}
        date={endDate ?? new Date()}
        onConfirm={onConfirm}
        validRange={{ endDate: dayjs().subtract(1, 'day').toDate() }}
      />

      <Modal visible={showDropdown} transparent animationType="fade">
        <TouchableOpacity
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000088' }}
          activeOpacity={1}
          onPressOut={() => setShowDropdown(false)}
        >
          <View className="bg-white rounded-md w-40">
            {typeOptions.map((deviceType) => (
              <TouchableOpacity
                key={deviceType}
                onPress={() => handleSelectType(deviceType)}
                className="px-4 py-2 border-b border-gray-200"
              >
                <Text className="text-gray-700">{deviceType}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
      
      <View className="absolute bottom-2 w-full">
        <Navigation current={2} />
      </View>
    </View>
  );
}
