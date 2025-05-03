import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { DatePickerModal } from 'react-native-paper-dates';
import dayjs from 'dayjs';

export default function ChooseCalendar({ endDate, setEndDate }: {endDate: Date, setEndDate: (date: Date) => void}) {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const adjustedEndDate = endDate ? dayjs(endDate).subtract(7, 'hour').toDate() : null;
  const onConfirm = ({ date }: { date: Date | undefined }) => {
    const newEnd = dayjs(date).add(1, 'day').set('hour', 6).set('minute', 59).set('second', 59).set('millisecond', 999).toDate();
    setEndDate(newEnd);
    setPickerVisible(false);
  };

  return(
    <View>
      <TouchableOpacity
        className="w-10/12 mt-4 mx-auto border border-black rounded-md p-1 shadow-md bg-white"
        onPress={() => setPickerVisible(true)}
      >
        <View className="flex flex-row">
          <View className="flex w-5/12 h-full items-center">
            <Text className="text-lg color-black-300">
              {`${endDate ? dayjs(adjustedEndDate).subtract(6, 'day').format('DD-MM-YYYY') : null}`}
            </Text>
          </View>
          <View className="w-2/12 flex items-center justify-center">
            <IconSymbol name="calendar" color="black" />
          </View>
          <View className="flex w-5/12 h-full items-center">
            <Text className="text-lg color-black-300">
              {`${endDate ? dayjs(adjustedEndDate).format('DD-MM-YYYY') : null}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      
      <DatePickerModal
        locale="en"
        mode="single"
        visible={isPickerVisible}
        onDismiss={() => setPickerVisible(false)}
        date={endDate ?? new Date()}
        onConfirm={onConfirm}
        validRange={{ endDate: dayjs().subtract(2, 'day').toDate() }}
      />
    </View>
  )
}