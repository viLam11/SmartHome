import React from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { BarChart } from "react-native-gifted-charts";

import Navigation from '@/components/Navigation';
import DeviceNav from '@/components/DeviceNav';

export default function Statistic() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [barData, setBarData] = React.useState([
        { value: 20, label: 'M' },
        { value: 30, label: 'T' },
        {
            value: 50,
            label: 'W',
            topLabelComponent: () => (
                <Text style={{ color: 'black', fontSize: 18, marginBottom: 6 }}>50</Text>
            ),
        },
        { value: 40, label: 'T' },
        { value: 30, label: 'F' },
    ])

    return (
        <View className="flex-1">
            <ScrollView>
                <View className='flex flex-row justify-between'>
                    <View className="mx -2">
                        <TouchableOpacity onPress={() => { router.back() }}>
                            <IconSymbol name="back" />
                        </TouchableOpacity>
                    </View>
                    <Text className='text-xl font-bold'>Đèn {+id}</Text>
                    <View>
                    </View>
                </View>
                <DeviceNav current={3} id = {+id} type="light" />

                <View>
                    <View className='w-9/12 mt-4 mx-auto border border-black rounded-md p-1 '>
                        <View className='flex flex-row'>
                            <View className=' w-10/12 h-full items-baseline'>
                                <Text className='text-lg color-black-200'>06/02/2025 - 07/03/2025</Text>
                            </View>
                            <View className='w-2/12 flex items-center justify-center'>
                                <IconSymbol name="calendar" color="black" />
                            </View>
                        </View>
                    </View>
                </View>

                <View className='flex items-center justify-center mt-4'>
                    <BarChart data={barData} />
                </View>
            </ScrollView>
            <View className="absolute bottom-2 w-full">
                <Navigation current={2} />
            </View>
        </View>

    )
}