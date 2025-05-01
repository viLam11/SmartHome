import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
export default function ChooseCalendar({ startDate, endDate, setOpen }: any) {
  return(
      <TouchableOpacity
        className="w-10/12 mt-4 mx-auto border border-black rounded-md p-1 shadow-md bg-white"
        onPress={() => setOpen(true)}
      >
        <View className="flex flex-row">
          <View className="flex w-5/12 h-full items-center">
            <Text className="text-lg color-black-300">
              {`${startDate}`}
            </Text>
          </View>
          <View className="w-2/12 flex items-center justify-center">
            <IconSymbol name="calendar" color="black" />
          </View>
          <View className="flex w-5/12 h-full items-center">
            <Text className="text-lg color-black-300">
              {`${endDate}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

  )
  }