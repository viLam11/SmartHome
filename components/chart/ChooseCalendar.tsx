import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
export default function ChooseCalendar({ startDate, endDate, setOpen }: any) {

  const formatDate = (date: Date) => {

    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('vi-VN', options);
  }

  return (
    <TouchableOpacity
      className="w-10/12 mt-4 mx-auto border border-black rounded-md p-1"
      onPress={() => setOpen(true)}
    >
      <View className="flex flex-row">
        <View className="flex w-10/12 h-full items-center">
          {startDate && endDate && <Text className="text-lg color-black">
            {`${formatDate(startDate)} - ${formatDate(endDate)}`}
          </Text>}

        </View>
        <View className="w-2/12 flex items-center justify-center">
          <IconSymbol name="calendar" color="black" />
        </View>
      </View>
    </TouchableOpacity>

  )
}