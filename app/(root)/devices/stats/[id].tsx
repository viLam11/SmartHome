import React from 'react';
import { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DeviceHeader from '@/components/device/DeviceHeader';
import { getDeviceStat, getStatisticService } from '@/services/statisticService';
// import { runningTimeObjects } from '@/types/statistic.type';
import { useLoading } from '@/contexts/LoadingContext';
import Navigation from '@/components/Navigation';
// import { BarChartAnimated } from '@/components/chart/BarChartAnimated';
// import ChooseCalendar from '@/components/chart/ChooseCalendar';
// import { DatePickerModal } from 'react-native-paper-dates';
// import { currentTime } from '@/constants/statistic';
import dayjs from 'dayjs';
import { BarChart } from 'react-native-gifted-charts';
// import { max } from 'date-fns';
// import { vi } from 'date-fns/locale';
import { fetchSensorData, getDeviceData } from '@/services/deviceService';
import { SelectDayRange } from '@/components/SelectDayRange';


export default function Statistic() {
  const feedId = useLocalSearchParams().id;
  const { setLoading } = useLoading();
  const [deviceData, setDeviceData] = useState<runningTimeObjects | null>(null);
  const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [barData, setBarData] = useState([]);
  const [totalTime, setTotalTime] = useState({hour: 0, minute: 0}); 
  const [initDates, setInitDates] = useState({
    startDate: dayjs(),
    endDate: dayjs(),
  })
  const [selectedDates, setSelectedDates] = useState({
    startDate: dayjs(),
    endDate: dayjs(),
  });

  function formatTime(hourArray: any) {
    const totalHours = hourArray.reduce((sum, item) => sum + item.value, 0);

    // Chuyển đổi sang giờ và phút
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);
    setTotalTime({
      hour: hours,
      minute: minutes,
    });
  }

  // const fetchStatistic = async (id: string, endDate: Date | null) => {
  //   setLoading(true);
  //   try {
  //     const response = await getStatisticService(id, endDate);
  //     setDeviceData(response);
  //   } catch (error) {
  //     console.error("Error fetching device data:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const now = new Date();
    const vnDateStr = now.toLocaleDateString("en-CA", { timeZone: "Asia/Ho_Chi_Minh" });
    const vnMidnight = new Date(`${vnDateStr}T00:00:00+07:00`);
    const sevenDaysAgoVN = new Date(vnMidnight);
    sevenDaysAgoVN.setUTCDate(sevenDaysAgoVN.getUTCDate() - 7);
    const vnEndOfDay = new Date(`${vnDateStr}T23:59:59+07:00`);
    const fetch7DaysData = async () => {
      const data = await getDeviceStat(feedId as string, sevenDaysAgoVN.toISOString(), vnEndOfDay.toISOString());
      setBarData(data);
      formatTime(data);
    }
    setInitDates({
      startDate: dayjs(sevenDaysAgoVN),
      endDate: dayjs(vnEndOfDay),
    })
    setSelectedDates({
      startDate: dayjs(sevenDaysAgoVN),
      endDate: dayjs(vnEndOfDay),
    })
    fetch7DaysData()
  }, [])

  useEffect(() => {
    const fetchDevData = async () => {
      const response = await getDeviceData(feedId as string);
      setDeviceData(response);
      formatTime(response)
    }
    fetchDevData();
  }, [])

  // useEffect(() => {
  //   if (!feedId) return;
  //   fetchStatistic(feedId as string, null);
  // }, [feedId, endDate]);

  const onDismiss = () => {
    setOpen(false);
  };

  async function onConfirm() {
    console.log('Selected range:', selectedDates.startDate.format('DD MMM, YYYY'), '-', selectedDates.endDate.format('DD MMM, YYYY'));
    setLoading(true);
    const data = await getDeviceStat(feedId as string, selectedDates.startDate.toISOString(), selectedDates.endDate.toISOString());
    console.log('SENSOR DATA 2:', data);
    setBarData(data);
    setLoading(false);
    setIsVisible(false);
  }

  async function onCancel() {
    setIsVisible(false);
    setSelectedDates(initDates);
  }

  return (
    <View className="flex-1 bg-white w-11/12 mx-auto">
      <ScrollView>
        <DeviceHeader
          status={3}
          type={deviceData?.type ?? ""}
          feedId={+feedId}
          title={deviceData ? `${deviceData.type} ${deviceData.title}` : ''}
        />

        <View className="mt-10 mb-2">
          <Text className='text-xl text-center font-bold'>Biểu đồ thời gian sử dụng</Text>
        </View>

        <SelectDayRange selectedDates={selectedDates} setSelectedDates={setSelectedDates} onCancel={onCancel} onConfirm={onConfirm} />

        <View className="flex flex-col w-9/12 mt-4 mx-auto p-1 bg-white justify-center items-center">
          <Text className="text-md color-black-200">Tổng thời gian</Text>
          <Text className="text-2xl color-black">{totalTime.hour} tiếng, {totalTime.minute} phút</Text>
          <Text className="text-md color-black-200 italic">Dự tính: 240.350 VND</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} className='mt-2'>
          {barData.length > 0 &&  <BarChart
            barWidth={20}
            noOfSections={10}
            frontColor="#177AD5"
            data={barData }
            showLine
            lineConfig={{
              color: 'black',
              shiftY: 4,
            }}
            spacing={24}
            yAxisThickness={2}
            xAxisThickness={2}
          />}
        </ScrollView>
      </ScrollView>

      <View className="absolute bottom-2 w-full">
        <Navigation current={2} />
      </View>
    </View>
  );
}