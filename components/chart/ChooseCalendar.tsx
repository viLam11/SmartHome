import { View, Text, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
export default function ChooseCalendar({ startDate, endDate, setOpen }: any) {
  return(
      <TouchableOpacity
        className="w-10/12 mt-4 mx-auto border border-black rounded-md p-1"
        onPress={() => setOpen(true)}
      >
        <View className="flex flex-row">
          <View className="flex w-10/12 h-full items-center">
            <Text className="text-lg color-black-200">
              {`${startDate} - ${endDate}`}
            </Text>
          </View>
          <View className="w-2/12 flex items-center justify-center">
            <IconSymbol name="calendar" color="black" />
          </View>
        </View>
      </TouchableOpacity>

  )
  }