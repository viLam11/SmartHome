import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { IconSymbol } from '@/components/ui/IconSymbol';
import ScheduleTable from '@/components/ScheduleTable';
import { useEffect, useState } from 'react';
import { getSchedule } from '@/services/scheduleService';

type Schedule = { 
    scheduledTime: string;
    action: string;
    repeatDays: string;
}

const tableHead = ["Start", "End", "Brightness", "Edit"];

const tableData = [
  ["17:00", "16:00", "nhẹ", ".."],
  ["20:00", "21:00", "nhẹ", ".."]
];

// const renderCell = (data, index ) => {
//   if (index === 3) {
//     return (
//       <TouchableOpacity onPress={() => alert("Xóa hàng này")}> 
//         <Text style={{ color: "red", textAlign: "center" }}>Xóa</Text>
//       </TouchableOpacity>
//     );
//   }
//   return <Text>{data}</Text>;
// };

export default function DeviceTimerTable( {setModal, feedId}: {setModal: (status: boolean) => void, feedId: number} ) {

  return (
    <View>
      <View className='flex flex-row justify-between'>
        <Text className='font-semibold mt-4'>Hẹn giờ</Text>
        <TouchableOpacity className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black items-center justify-center z-50" onPress={() => {setModal(true)}}>
          <View className='bg-black rounded-full'>
            <IconSymbol name="add" color="white" />
          </View>
        </TouchableOpacity>
      </View>
      <View className='mt-2'>
        <ScheduleTable tableData={tableData} />
      </View>
  </View>
  );
}