import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native';
import { getSummaryDeviceStatisticService, getSummaryStatisticService } from '@/services/statisticService';
import { PieChart } from 'react-native-gifted-charts';
import { BarChartAnimated, PieChartAnimated } from '@/components/chart/BarChartAnimated';
import { useLoading } from '@/contexts/LoadingContext';
import { DatePickerModal, de } from 'react-native-paper-dates';
import ChooseCalendar from '@/components/chart/ChooseCalendar';
import Navigation from '@/components/Navigation';
import dayjs from 'dayjs';
import { deviceActive, deviceActiveWColor, deviceRatio, deviceRatioWColor, runningTimeDeviceTypeObjects } from '@/types/statistic.type';

export default function StatisticMockUI() {
  const { setLoading } = useLoading();
  const [type, setType] = useState('light');
  const [deviceData, setDeviceData] = useState<runningTimeDeviceTypeObjects | null>(null);
  const [runningTime, setRunningTime] = useState<string>("");
  const [deviceRatio, setDeviceRatio] = useState<deviceRatioWColor[]>([]);
  const [deviceActive, setDeviceActive] = useState<deviceActiveWColor[]>([]);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const fetchStatistic = async (type: string, endDate: Date | null) => {
    setLoading(true);
    try {
      const deviceRunningTime = await getSummaryDeviceStatisticService(type, endDate);
      setDeviceData(deviceRunningTime);
      const deviceData = await getSummaryStatisticService();
      setRunningTime(deviceData.totalRuntime);
      setDeviceRatio(
        deviceData.deviceRatio.map((item, index) => ({
          ...item,
          color: ['#6B46C1', '#7F9CF5', '#90CDF4'][index % 3],
        }))
      );
      setDeviceActive(
        deviceData.deviceActive.map((item, index) => ({
          ...item,
          color: ['bg-yellow', 'bg-green-400', 'bg-orange-400'][index % 3],
        }))
      );

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
    { key: "Run time:", value: runningTime},
    { key: "Most used:", value: deviceRatio[0]?.label },
    { key: "Least used:", value: deviceRatio[1]?.label },
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
              <PieChartAnimated pieData={deviceRatio} />
            </View>
            <View className='w-1/2 justify-center'>
              {deviceRatio.map((item, index) => (
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
            {deviceActive.map((device, index) => (
              
              <View key={index} className={`rounded-2xl shadow-md ${device.color} `}>
                <View className={`items-center`}>
                  <Text className="text-lg font-semibold text-white">{device.type}</Text>
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

