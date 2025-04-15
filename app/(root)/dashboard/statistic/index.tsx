import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native';
import { getSummaryDeviceStatisticService } from '@/services/statisticService';
import { PieChart } from 'react-native-gifted-charts';
import { BarChartAnimated, PieChartAnimated } from '@/components/chart/BarChartAnimated';
import { useLoading } from '@/contexts/LoadingContext';
import { DatePickerModal } from 'react-native-paper-dates';
import ChooseCalendar from '@/components/chart/ChooseCalendar';
import Navigation from '@/components/Navigation';
import dayjs from 'dayjs';
import { runningTimeDeviceTypeObjects } from '@/types/statistic.type';

export default function StatisticMockUI() {
  const { setLoading } = useLoading();
  const [type, setType] = useState('light');
  const [deviceData, setDeviceData] = useState<runningTimeDeviceTypeObjects | null>(null);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState<{
    hour: number;
    minute: number;
    dayOfWeek: string;
    day: number;
    month: string;
  }>({
    hour: dayjs().hour(),
    minute: dayjs().minute(),
    dayOfWeek: dayjs().format('ddd'),
    day: dayjs().date(),
    month: dayjs().format('MMM'),
  });
  
  const [containerWidth, setContainerWidth] = useState(0);

  const fetchStatistic = async (type: string, endDate: Date | null) => {
    setLoading(true);
    try {
      const response = await getSummaryDeviceStatisticService(type, endDate);
      setDeviceData(response);
    } catch (error) {
      console.error("Error fetching device data:", error);
    } finally {
      setLoading(false);
    }
  };

  const onConfirm = ({ date }: { date: Date | undefined }) => {
    const newEnd = dayjs(date).endOf('day').toDate();  
    setEndDate(newEnd);
    setPickerVisible(false);
  };
  useEffect(() => {
    fetchStatistic(type, null);
  }, []);

  useEffect(() => {
    if (endDate) {
      fetchStatistic(type, endDate);
    }
  }, [type, endDate]);
  const outStand = [
    { key: "Run time:", value: `${currentTime.hour}hrs, ${currentTime.minute} mins` },
    { key: "Most used:", value: "Living room" },
    { key: "Least used:", value: "Garage" },
  ]
  const pieData = [
    { value: 0.488, label: 'Light', color: '#6B46C1' },
    { value: 0.243, label: 'Fan', color: '#7F9CF5' },
    { value: 0.146, label: 'None1', color: '#90CDF4' },
    { value: 0.123, label: 'None2', color: '#CBD5E0' },
  ];

  const devices = [
    { label: 'Lights', active: 2, inactive: 4, color: 'bg-yellow' },
    { label: 'Fans', active: 1, inactive: 2, color: 'bg-green-400' },
    { label: 'Doors', active: 1, inactive: 0, color: 'bg-orange-400' },
  ];

  return (
    <View className="flex-1 bg-slate-100">
      <ScrollView className='p-2'>
        <View className='flex flex-row justify-center'>
          <View className='w-1/2 bg-yellow p-1 rounded-xl shadow-md'>
            <Text className="text-2xl font-bold text-center">Statistics </Text>
          </View>
        </View>

        <ChooseCalendar startDate={deviceData?.startDate} endDate={deviceData?.endDate} setOpen={setPickerVisible} />

        <BarChartAnimated setType={setType} barData={deviceData ? deviceData.data : []} />
        <View>
          <Text className="mt-10 text-lg font-semibold">Outstanding</Text>
        </View>
        <View className='flex flex-col px-2'>
          <View className="w-full mt-4 bg-sky-100 p-2 rounded-md">
            {outStand.map((item, index) => (
              <View key={index} className='flex flex-col items-center mt-2'>
                <Text className="text-sm font-semibold">{item.key}</Text>
                <Text>{item.value}</Text>
              </View>
            ))}
          </View>
          
          <View className="flex flex-row mt-4 bg-white rounded-md shadow-md justify-between py-3">
            <View className='w-1/2'>
              <PieChartAnimated pieData={pieData} />
            </View>
            <View className='w-1/2 justify-center'>
              {pieData.map((item, index) => (
                <View key={index} className="flex-row items-center">
                  <View style={{ width: 12, height: 12, backgroundColor: item.color, marginRight: 8, borderRadius: 6 }} />
                  <Text className="text-sm">{`(${item.value * 100}%) ${item.label}`}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className="mt-12">
          <View className='flex flex-row'>
            <View className='w-1/2 bg-sky-300 p-1 rounded-xl'>
              <Text className="text-xl font-bold text-center">Devices</Text>
            </View>
          </View>
          <View className="grid grid-cols-2 gap-2 mt-5 mb-16">
            {devices.map((device, index) => (
              
              <View key={index} className={`rounded-2xl shadow-md ${device.color} `}>
                <View className={`items-center`}>
                  <Text className="text-lg font-semibold text-white">{device.label}</Text>
                </View>
                <View className={`rounded-b-2xl shadow-md bg-white items-center`}>
                  <Text className="">Active: {device.active}</Text>
                  <Text className="">Inactive: {device.inactive}</Text>
                </View>
              </View>
            ))}
          </View>
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
      
      <View className="absolute bottom-2 w-full">
        <Navigation current={2} />
      </View>
    </View>
  );
}

