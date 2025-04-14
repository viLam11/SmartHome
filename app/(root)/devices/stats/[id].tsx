import { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DeviceHeader from '@/components/device/DeviceHeader';
import { getStatisticService } from '@/services/statisticService';
import { runningTimeObjects } from '@/types/statistic.type';
import { useLoading } from '@/contexts/LoadingContext';
import Navigation from '@/components/Navigation';
import BarChartAnimated from '@/components/chart/BarChartAnimated';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { DatePickerModal } from 'react-native-paper-dates';
import dayjs from 'dayjs';

export default function Statistic() {
  const feedId = useLocalSearchParams().id;
  const { setLoading } = useLoading();
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
  const [deviceData, setDeviceData] = useState<runningTimeObjects | null>(null);

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
    if (feedId && startDate && endDate) {
      fetchStatistic(feedId as string, endDate);
    }
  }, [startDate, endDate]);

  const onDismiss = () => {
    setOpen(false);
  };
  
  const onConfirm = ({ date }: { date: Date | undefined }) => {
    const newEnd = dayjs(date).endOf('day').toDate();
    const newStart = dayjs(newEnd).subtract(6, 'day').startOf('day').toDate();
  
    setEndDate(newEnd);
    setStartDate(newStart);
    setOpen(false);
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <DeviceHeader
          feedId={+feedId}
          title={deviceData ? `${deviceData.type} ${deviceData.title}` : null}
        />

        <TouchableOpacity
          className="w-9/12 mt-4 mx-auto border border-black rounded-md p-1"
          onPress={() => setOpen(true)}
        >
          <View className="flex flex-row">
            <View className="flex w-10/12 h-full items-center">
              <Text className="text-lg color-black-200">
                {startDate && endDate
                  ? `${dayjs(startDate).format('DD/MM/YYYY')} - ${dayjs(endDate).format('DD/MM/YYYY')}`
                  : `${deviceData?.startDate} - ${deviceData?.endDate}`}
              </Text>
            </View>
            <View className="w-2/12 flex items-center justify-center">
              <IconSymbol name="calendar" color="black" />
            </View>
          </View>
        </TouchableOpacity>
        <View className="flex flex-col w-9/12 mt-4 mx-auto p-1 bg-white justify-center items-center">
         <Text className="text-2xl color-black">{currentTime.hour}hrs, {currentTime.minute} mins</Text>
         <Text className="text-lg color-black-200">{currentTime.dayOfWeek}, {currentTime.day} {currentTime.month}</Text>
        </View>
        <View className='border border-black rounded-md mt-4 w-11/12 mx-auto'>
          <BarChartAnimated barData={deviceData ? deviceData.data : []} />
        </View>
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

