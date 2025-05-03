import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Modal, TouchableOpacity, FlatList } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { deviceRatioWColorType, runningTimeDeviceType } from '@/types/statistic.type';
import { DTOBarData, formatBarData } from '../CaculateData';
import { set } from 'date-fns';

export function BarChartAnimated({
  roomOptions,
  setRoomOptionBar,
  barData
}: {
  roomOptions: { title: string; id: number }[],
  setRoomOptionBar: (roomOption: { title: string; id: number }) => void,
  barData: runningTimeDeviceType
}) {
  const maxHeight = 160;
  const [selectedRoom, setSelectedRoom] = useState(roomOptions[0]?.title || '');
  const [showDropdown, setShowDropdown] = useState(false);
  const handleSelectRoom = (option: { title: string; id: number }) => {
    setSelectedRoom(option.title);
    setRoomOptionBar(option);
    setShowDropdown(false);
  };
  const data = formatBarData(barData);

  useEffect(() => {
    setSelectedRoom(roomOptions[0]?.title || '');
  },[roomOptions]);
  return (
    <View className='rounded-md mt-4 w-11/12 mx-auto'>
      <View className="justify-center items-center bg-[#333340] rounded-2xl p-4 pl-0 pl-1 shadow-md">
        <View className='flex flex-row w-full items-end mb-2'>
          <View className='w-1/2'>
            {roomOptions.length > 0 && (
              <View className='flex flex-row'>
                <Pressable onPress={() => setShowDropdown(true)} className='ml-2'>
                <Text className="text-md text-white font-semibold">{selectedRoom} ▼</Text>
                </Pressable>
              </View>
              )}

            <Modal visible={showDropdown} transparent animationType="fade">
              <TouchableOpacity
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000088' }}
              activeOpacity={1}
              onPressOut={() => setShowDropdown(false)}
              >
              <View className="bg-white rounded-md w-40">
                {roomOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => {
                  handleSelectRoom(option);
                  }}
                  className="px-4 py-2 border-b border-gray-200"
                >
                  <Text className="text-gray-700">{option.title}</Text>
                </TouchableOpacity>
                ))}
              </View>
              </TouchableOpacity>
            </Modal>
          </View>
          <View className='w-1/2 items-end'>
            <Text className="text-md text-white font-semibold">Running Time</Text>
          </View>
        </View>

        <BarChart
          data={data}
          height={maxHeight}
          noOfSections={6}
          maxValue={24}
          isAnimated
          animationDuration={500}
          yAxisTextStyle={{ fontSize: 12, color: 'white' }}
          barBorderRadius={10}
          initialSpacing={10}
          yAxisThickness={0}
          xAxisThickness={0}
        />
      </View>
    </View>
  );
}

export function PieChartAnimated({ pieData }: { pieData: deviceRatioWColorType[] }) {
  const formattedPieData = pieData.map((item, index) => ({
    value: item.value,
    color: item.color,
    label: item.label,
    gradientCenterColor: item.gradientCenterColor || item.color,
    focused: index === 0,
  }));

  const focusedItem = formattedPieData.find((item) => item.focused) || formattedPieData[0] || { value: 0, label: '' };

  const renderDot = (color: string) => (
    <View className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color, marginRight: 10 }} />
  );

  const renderLegendComponent = () => {
    const pairs = [];
    for (let i = 0; i < formattedPieData.length; i += 2) {
      pairs.push(formattedPieData.slice(i, i + 2));
    }

    return (
      <>
        {pairs.map((pair, index) => (
          <View key={index} className="flex-row justify-start mb-2.5">
            {pair.map((item, idx) => (
                <View
                key={idx}
                className={`flex-row items-center ${idx === 0 && pair.length > 1 ? 'mr-5' : ''} w-30`}
                >
                {renderDot(item.gradientCenterColor)}
                <Text className="text-white">{`${item.label}: ${(item.value * 100).toFixed(0)}%`}</Text>
              </View>
            ))}
          </View>
        ))}
      </>
    );
  };

  return (
    <View className="rounded-2xl bg-[#34448B] flex-1 mt-4 p-2 shadow-md">
      <View className="m-5 p-4 rounded-2xl bg-[#232B5D]">
        <Text className="text-white text-lg font-bold">Total Room Uptime</Text>
        <View className="p-5 items-center">
          <PieChart
            data={formattedPieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor="#232B5D"
            showText
            textColor="white"
            textSize={12}
            focusOnPress
            centerLabelComponent={() => (
              <View className="justify-center items-center">
                <Text className="text-white text-2xl font-bold">{(focusedItem.value * 100).toFixed(0)}%</Text>
                <Text className="text-white text-sm">{focusedItem.label}</Text>
              </View>
            )}
          />
        </View>
        {renderLegendComponent()}
      </View>
    </View>
  );
}
