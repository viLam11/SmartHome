import React, { useState } from 'react';
import { View, Text, Pressable, Modal, TouchableOpacity, FlatList } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { deviceRatioWColorType, runningTimeDeviceType } from '@/types/statistic.type';
import { DTOBarData, formatBarData } from '../CaculateData';

const roomOptions = ['All', 'room1', 'room2', 'room3'];

export function BarChartAnimated({
  setRoom,
  barData
}: {
  setRoom: (room: string) => void,
  barData: runningTimeDeviceType
}) {
  const maxHeight = 160;
  const [selectedRoom, setSelectedRoom] = useState('All');
  const [option, setOption] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelectRoom = (room: string) => {
    setSelectedRoom(room);
    setRoom?.(room);
    setShowDropdown(false);
  };
  const data = formatBarData(barData);
  return (
    <View className='rounded-md mt-4 w-11/12 mx-auto'>
      <View className="justify-center items-center bg-[#333340] rounded-2xl p-4 pl-0 pl-1 shadow-md">
        <View className='flex flex-row w-full items-end mb-2'>
          <View className='w-1/2'>
            <View className='flex flex-row'>
              <Pressable onPress={() => { setShowDropdown(true); setOption('room') }} className='ml-2'>
                <Text className="text-md text-white font-semibold">{selectedRoom} ▼</Text>
              </Pressable>
            </View>

            <Modal visible={showDropdown} transparent animationType="fade">
              <TouchableOpacity
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000088' }}
                activeOpacity={1}
                onPressOut={() => setShowDropdown(false)}
              >
                <View className="bg-white rounded-md w-40">
                  {option === 'room' && roomOptions.map((room) => (
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
  const [selectedIndex, setSelectedIndex] = useState(0);
  let formattedPieData = pieData.map((item, index) => ({
    value: item.value,
    color: item.color,
    label: item.label,
    gradientCenterColor: item.gradientCenterColor || item.color,
    focused: index === 0,
  }));
   formattedPieData = formattedPieData.map((item, index) => ({
    ...item,
    focused: index === selectedIndex,
    onPress: () => setSelectedIndex(index), // gán sự kiện click
  }));


  const selectedItem = pieData[selectedIndex];

  const focusedItem = formattedPieData.find((item) => item.focused) || formattedPieData[0] || { value: 0, label: '' };

  const renderDot = (color: string) => (
    <View className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color, marginRight: 10 }} />
  );

  const renderLegendComponent = () => {
    // const pairs = [];
    // for (let i = 0; i < formattedPieData.length; i += 2) {
    //   pairs.push(formattedPieData.slice(i, i + 2));
    // }

    return (
      <>
        {formattedPieData.map((item, index) => (
              <View
                key={index}
                className={`flex-row items-center`}
              >
                {renderDot(item.gradientCenterColor)}
                <Text className="text-black">{`${item.label}: ${(item.value).toFixed(0)} h`}</Text>
              </View>
        ))}
      </>
    );
  };

  return (
    <View className='rounded-2xl bg-white flex-1 mt-4 p-2 shadow-md'>
      <Text className="text-black  text-center text-xl font-bold m-2">Nổi bật</Text>
      <View className=" flex flex-row">
        <View className="w-5/12 flex justify-between ">
          <View className=''>
            <Text className='text-left'>Đã dùng:</Text>
            <Text className='text-right uppercase font-bold  text-2xl'>120 giờ</Text>
            <Text>Dự tính:</Text>
            <Text className='text-right uppercase font-bold italic text-2xl'>200.000 VND</Text>
          </View>
            <View className='bottom-0'>
              {renderLegendComponent()}
            </View>
        </View>
        <View className="m-5 rounded-2xl bg-white w-7/12">
          <View className=" items-center">
            <PieChart
              data={formattedPieData}
              donut
              showGradient
              sectionAutoFocus
              radius={80}
              innerRadius={40}
              innerCircleColor="white"
              showText
              textColor="black"
              textSize={12}
              centerLabelComponent={() => (
                <View className="justify-center items-center">
                  <Text className="text-black text-2xl font-bold">{(selectedItem.value).toFixed(0)} h</Text>
                  <Text className="text-black text-sm">{selectedItem.label}</Text>
                </View>
              )}
            />
          </View>

        </View>
      </View>
    </View>
  );
}
