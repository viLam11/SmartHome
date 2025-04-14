import { View, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { useState } from 'react';
import { DatePickerModal } from 'react-native-paper-dates';
import Navigation from '@/components/Navigation';
import dayjs from 'dayjs';

export default function StatisticMockUI() {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date('2021-06-18'));
  const [endDate, setEndDate] = useState(new Date('2021-06-24'));

  const onConfirm = ({ date }: { date: Date | undefined }) => {
    if (!date) return;
    setEndDate(date);
    setStartDate(dayjs(date).subtract(6, 'day').toDate());
    setPickerVisible(false);
  };

  const barData = [
    { value: 40, label: 'Mon' },
    { value: 50, label: 'Tue' },
    { value: 30, label: 'Wed' },
    { value: 80, label: 'Thu' },
    { value: 20, label: 'Fri' },
    { value: 60, label: 'Sat' },
  ];

  const pieData = [
    { value: 48.8, label: 'Tổng điện năng', color: '#6B46C1' },
    { value: 24.3, label: 'Máy lạnh', color: '#7F9CF5' },
    { value: 14.6, label: 'Quạt', color: '#90CDF4' },
    { value: 12.3, label: 'Khác', color: '#CBD5E0' },
  ];

  const devices = [
    { label: 'Đèn', active: 2, inactive: 4, color: 'bg-yellow-400' },
    { label: 'Quạt', active: 1, inactive: 2, color: 'bg-green-400' },
    { label: 'Máy lạnh', active: 1, inactive: 1, color: 'bg-blue-400' },
    { label: 'Store Room', active: 1, inactive: 0, color: 'bg-orange-400' },
  ];

  return (
    <View className="flex-1 bg-slate-100 p-4">
      <ScrollView>
        <Text className="text-2xl font-bold text-center">Thống kê</Text>

        <TouchableOpacity
          className="border border-gray-400 rounded-md p-2 mt-4 flex-row justify-between items-center bg-white"
          onPress={() => setPickerVisible(true)}
        >
          <Text>
            {dayjs(startDate).format('MM/DD/YYYY')} - {dayjs(endDate).format('MM/DD/YYYY')}
          </Text>
        </TouchableOpacity>

        <View className="mt-4 bg-white p-4 rounded-md shadow-md">
          <Text className="text-lg font-semibold mb-2">Running time</Text>
          <BarChart data={barData} barWidth={20} height={150} frontColor="#3182CE"/>
        </View>

        <View className="mt-4">
          <Text className="text-xl font-semibold">Nổi bật</Text>
          <Text>Run time: 15 Hrs 24 Mins</Text>
          <Text>Most used: Living room</Text>
          <Text>Least used: Garage</Text>
        </View>

        <View className="mt-4 bg-white p-4 rounded-md shadow-md">
          <PieChart
            data={pieData}
            donut
            showText
            textColor="white"
            focusOnPress
            centerLabelComponent={() => <Text className="text-sm">Tổng điện năng</Text>}
          />
        </View>

        <View className="mt-6">
          <Text className="text-xl font-bold">Thiết bị</Text>
          <View className="grid grid-cols-2 gap-2 mt-2">
            {devices.map((device, index) => (
              <View key={index} className={`p-4 rounded-xl shadow-md ${device.color}`}>
                <Text className="text-lg font-semibold text-white">{device.label}</Text>
                <Text className="text-white">Active: {device.active}</Text>
                <Text className="text-white">Inactive: {device.inactive}</Text>
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
        date={endDate}
        onConfirm={onConfirm}
        validRange={{ endDate: dayjs().subtract(2, 'day').toDate() }}
      />
      
      <View className="absolute bottom-2 w-full">
        <Navigation current={2} />
      </View>
    </View>
  );
}
