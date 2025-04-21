import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import DeviceNav from './DeviceNav';
export default function DeviceHeader ({status, feedId, title}: {feedId: number, title: string | null, status: number}) {
    const router = useRouter();
    return (<>
        <View className='flex flex-row justify-between'>
            <View className="mx -2">
                <TouchableOpacity onPress={() => { router.back() }}>
                    <IconSymbol name="back" color={"black"}/>
                </TouchableOpacity>
            </View>
            <Text className='text-xl font-bold'>{title === null ? '' : title}</Text>
            <View>
            </View>
        </View>

        <DeviceNav status={status}  feedId={+feedId} type={"light"} />
    </>);
}