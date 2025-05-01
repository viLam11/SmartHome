import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native';
import { getSummaryDeviceStatisticService, getSummaryStatisticService } from '@/services/statisticService';
import { BarChartAnimated, PieChartAnimated } from '@/components/chart/BarChartAnimated';
import { useLoading } from '@/contexts/LoadingContext';
import { DatePickerModal, de } from 'react-native-paper-dates';
import ChooseCalendar from '@/components/chart/ChooseCalendar';
import Navigation from '@/components/Navigation';
import dayjs from 'dayjs';
import { deviceRatioWColorType, runningTimeDeviceType } from '@/types/statistic.type';

export default function StatisticMockUI() {
  const { setLoading } = useLoading();
  const [type, setType] = useState('light');
  const [room, setRoom] = useState('All');
  const [deviceData, setDeviceData] = useState<runningTimeDeviceType | null>(null);
  const [runningTime, setRunningTime] = useState<string>("");
  const [deviceRatio, setDeviceRatio] = useState<deviceRatioWColorType[]>([]);
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [endDate, setEndDate] = useState<Date | null>(null);



  const fetchStatistic = async (type: string, endDate: Date | null) => {
    setLoading(true);
    try {
      const deviceRunningTime = await getSummaryDeviceStatisticService(room, type, endDate);
      setDeviceData(deviceRunningTime);
      const deviceData = await getSummaryStatisticService();
      setRunningTime(deviceData.totalRuntime);
      setDeviceRatio(
        deviceData.deviceRatioType.map((item, index) => ({
          ...item,
          color: ['#009FFF', '#93FCF8', '#BDB2FA'][index % 3],
          gradientCenterColor: ['#006DFF', '#3BE9DE', '#8F80F3'][index % 3],
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
        

        {/* <ChooseCalendar startDate={deviceData?.startDate} endDate={deviceData?.endDate} setOpen={setPickerVisible} /> */}
        
        <ChooseCalendar 
          startDate={deviceData ? Object.keys(deviceData[type] ?? {})[0] : null} 
          endDate={deviceData ? Object.keys(deviceData[type] ?? {})[Object.keys(deviceData[type] ?? {}).length - 1] : null} 
          setOpen={setPickerVisible} 
        />

        <BarChartAnimated setRoom={setRoom} setType={setType} barData={deviceData ?? {}} />
        <View>
          <Text className="mt-10 text-lg font-semibold">Outstanding</Text>
        </View>
        <View className='flex flex-col px-2'>
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

        <View className="mt-12">
          <View className='flex flex-row'>
            <View className='w-1/2 bg-sky-300 p-1 rounded-xl'>
              <Text className="text-xl font-bold text-center">Devices</Text>
            </View>
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

