import React, { useState } from 'react';
import { View, Text, Pressable, Modal, TouchableOpacity, FlatList } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { timeADayObject } from '@/types/statistic.type';

const typeOptions = ['light', 'fan', 'door'];
const roomOptions = ['All', 'room1', 'room2', 'room3'];

export function BarChartAnimated({ setRoom, setType, barData }: { setRoom:(room: string) => void, setType: (type: string) => void, barData: timeADayObject[] }) {
  // const maxHeight = 160;
  const [selectedType, setSelectedType] = useState('light');
  const [selectedRoom, setSelectedRoom] = useState('All');
  const [option, setOption] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setType?.(type);
    setShowDropdown(false);
  };
  const handleSelectRoom = (room: string) => {
    setSelectedRoom(room);
    setRoom?.(room);
    setShowDropdown(false);
  };

  const data = barData.map((bar) => {
    const opacity = Math.max(0.2, bar.value / 24);
    const color = `rgba(128, 0, 128, ${opacity})`;

    return {
      value: bar.value,
      label: bar.date,
      frontColor: color,
      spacing: 12,
      barBorderRadius: 12,
      labelTextStyle: {
        fontSize: 12,
        fontFamily: 'FiraCode-Regular',
        color: 'black',
      },
    };
  });

  return (
    <View className='rounded-md mt-4 w-11/12 mx-auto'>
      <View className="justify-center items-center bg-white rounded-2xl p-4 pl-1 shadow-md">
        <View className='flex flex-row w-full items-end mb-2'>
          <View className='w-1/2'>
            <View className='flex flex-row'>
              <Pressable onPress={() => {setShowDropdown(true); setOption('type')}}>
                <Text className="text-md text-gray-500 font-semibold">{selectedType} ▼</Text>
              </Pressable>
              <Pressable onPress={() => {setShowDropdown(true); setOption('room')}} className='ml-2'>
                <Text className="text-md text-gray-500 font-semibold">{selectedRoom} ▼</Text>
              </Pressable>
            </View>

            <Modal visible={showDropdown} transparent animationType="fade">
              <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000088' }}
                activeOpacity={1}
                onPressOut={() => setShowDropdown(false)}
              >
                <View className="bg-white rounded-md w-40">
                  {option==='type' && typeOptions.map((type) => (
                    <TouchableOpacity
                      key={type}
                      onPress={() => handleSelectType(type)}
                      className="px-4 py-2 border-b border-gray-200"
                    >
                      <Text className="text-gray-700">{type}</Text>
                    </TouchableOpacity>
                  ))}
                  {option==='room' && roomOptions.map((room) => (
                    <TouchableOpacity
                      key={room}
                      onPress={() => handleSelectRoom(room)}
                      className="px-4 py-2 border-b border-gray-200"
                    >
                      <Text className="text-gray-700">{room}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </TouchableOpacity>
            </Modal>
          </View>

          <View className='w-1/2 items-end'>
            <Text className="text-md text-gray-500 font-semibold">Running Time</Text>
          </View>
        </View>

        <BarChart
          data={data}
          barWidth={20}
          // noOfSections={6
          // maxValue={24}
          isAnimated
          animationDuration={500}
          yAxisTextStyle={{ fontSize: 12 }}
          barBorderRadius={10}
          initialSpacing={10}
          yAxisThickness={0}
          xAxisThickness={0}
        />
      </View>
    </View>
  );
}

export function PieChartAnimated({ pieData }: { pieData: { label: string, value: number }[] }) {  
  const [containerWidth, setContainerWidth] = useState(0);
  return (
    <View className=""            
      onLayout={(event) => {
      const width = event.nativeEvent.layout.width;
      setContainerWidth(width);
      }}>
      {containerWidth > 0 && (
        <PieChart
          data={pieData}
          donut
          radius={containerWidth / 2.2}
          innerRadius={containerWidth  / 6}
          showText
          textColor="black"
          focusOnPress
          centerLabelComponent={() => (
            <Text className="text-sm font-semibold text-center">
            Total Uptime
            </Text>
          )}
        />
      )}
    </View>
  )
}