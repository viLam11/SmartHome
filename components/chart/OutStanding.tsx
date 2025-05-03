import React, { useState } from 'react';
import { View, Text, Pressable, Modal, TouchableOpacity } from 'react-native';
import { deviceRatioWColorType } from '@/types/statistic.type';

import { PieChartAnimated } from '@/components/chart/BarChartAnimated';

const deviceTypeOptions = [
    { title: 'All', value: 'all' },
    { title: 'Light', value: 'light' },
    { title: 'Fan', value: 'fan' },
];

export function Outstanding({
    runningTime,
    deviceRatio,
    setDeviceType
}: {
    runningTime: string;
    deviceRatio: deviceRatioWColorType[];
    setDeviceType: (option: { title: string; value: string }) => void;
}) {
    const [deviceTypeTitle, setDeviceTypeTitle] = useState<string>(deviceTypeOptions[0].title);
        
    const outStand = [
        { key: "Total Run Time Of Indoor Device:", value: runningTime + " Hours" },
        { key: "Most used:", value: deviceRatio[0]?.label },
        { key: "Least used:", value: deviceRatio[1]?.label },
    ];
    const [showDropdown, setShowDropdown] = useState(false);
    
    const handleSelectType = ( option: { title: string, value: string}) => {
        setDeviceType?.(option);
        setDeviceTypeTitle(option.title);
        setShowDropdown(false);
    };
    return(
        <View>
            <View className='flex flex-row justify-between items-center mt-10'>
                <View className='w-1/2 ml-3'>
                    <Text className="text-xl font-semibold">Outstanding</Text>
                </View>

                <Pressable onPress={() => {setShowDropdown(true)}} className='w-1/2 border-2 border-sky-300 shadow rounded-md p-1 flex justify-center items-center'>
                    <Text className="text-sm text-gray-500 font-semibold">{deviceTypeTitle} ▼</Text>
                </Pressable>
            </View>
            
            <View className='flex flex-col px-2 mb-20'>
                <View className="w-full mt-4 bg-sky-100 p-2 rounded-md shadow-lg">
                {outStand.map((item, index) => (
                    <View key={index} className='flex flex-col items-center mt-2'>
                        <Text className="text-sm">{item.key}</Text>
                        <Text className='text-lg font-semibold'>{item.value}</Text>
                    </View>
                ))}
                </View>
                <PieChartAnimated pieData={deviceRatio} />
            </View>
                
            <Modal visible={showDropdown} transparent animationType="fade">
                <TouchableOpacity
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000088' }}
                    activeOpacity={1}
                    onPressOut={() => setShowDropdown(false)}
                >
                    <View className="bg-white rounded-md w-40">
                    {deviceTypeOptions.map((option) => (
                        <TouchableOpacity
                        key={option.value}
                        onPress={() => handleSelectType(option)}
                        className="px-4 py-2 border-b border-gray-200"
                        >
                        <Text className="text-gray-700">{option.title}</Text>
                        </TouchableOpacity>
                    ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}