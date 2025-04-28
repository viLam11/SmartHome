import React from 'react';
import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DeviceHeader from '@/components/device/DeviceHeader';
import { getStatisticService } from '@/services/statisticService';
import { runningTimeObjects } from '@/types/statistic.type';
import { useLoading } from '@/contexts/LoadingContext';
import Navigation from '@/components/Navigation';
import { BarChartAnimated } from '@/components/chart/BarChartAnimated';
import ChooseCalendar from '@/components/chart/ChooseCalendar';
import { DatePickerModal } from 'react-native-paper-dates';
import { currentTime } from '@/constants/statistic';
import dayjs from 'dayjs';
import { BarChart } from 'react-native-gifted-charts';
import { max } from 'date-fns';
import { vi } from 'date-fns/locale'; 

const barData = [
  {value: 250, label: '1/1'},
  {value: 500, label: '2/1', frontColor: '#177AD5'},
  {value: 745, label: '3/1', frontColor: '#177AD5'},
  {value: 320, label: 'T'},
  {value: 600, label: 'F', frontColor: '#177AD5'},
  {value: 256, label: 'S'},
  {value: 300, label: 'S'},
];
const maxValue = Math.max(...barData.map(item => item.value)) + 50;


export default function Statistic() {
  const feedId = useLocalSearchParams().id;
  const { setLoading } = useLoading();
  const [deviceData, setDeviceData] = useState<runningTimeObjects | null>(null);
  const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  const fetchStatistic = async (id: string, endDate: Date | null) => {
    setLoading(true);
    try {
      const response = await getStatisticService(id, endDate);
      setDeviceData(response);
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

  async function onConfirm({ startDate, endDate }: any) {
    if (!startDate || !endDate) {
      alert("Chọn ngày bắt đầu và kết thúc");
      return;
    }
    console.log("Selected dates:", startDate, endDate);
    setStartDate(startDate);
    setEndDate(endDate);
    setOpen(false);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <DeviceHeader
          status={3}
          feedId={+feedId}
          title={deviceData ? `${deviceData.type} ${deviceData.title}` : null}
        />
        <ChooseCalendar startDate={startDate} endDate={endDate} setOpen={setOpen} />

        <View className="flex flex-col w-9/12 mt-4 mx-auto p-1 bg-white justify-center items-center">
          <Text className="text-md color-black-200">Tổng thời gian</Text>
          <Text className="text-2xl color-black">{currentTime.hour} tiếng, {currentTime.minute} phút</Text>
          <Text className="text-md color-black-200 italic">Dự tính: 240.350 VND</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} className='mt-2'>
          <BarChart  
          barWidth={20}
          noOfSections={10}
          frontColor="#177AD5"
          data={barData}
          showLine
          lineConfig={{
            color: 'black',
            shiftY: 4,  
          }}
          maxValue={maxValue}  
          yAxisThickness={0} 
          xAxisThickness={0}
          />
        </ScrollView>
      </ScrollView>

      <DatePickerModal
        locale="vi"
        mode="range"
        visible={open}
        onDismiss={onDismiss}
        startDate={range.startDate}
        endDate={range.endDate}
        onConfirm={onConfirm}
        saveLabel="Xác nhận"
        label="Chọn ngày"
        startLabel="Từ ngày"
        endLabel="Đến ngày"
        presentationStyle="pageSheet"
      />
      <View className="absolute bottom-2 w-full">
        <Navigation current={2} />
      </View>
    </View>
  );
}
