import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import DeviceNav from './DeviceNav';
export default function DeviceHeader ({feedId, title}: {feedId: number, title: string | null}) {
    const router = useRouter();
    return (<>
        <View className='flex flex-row justify-between'>
            <View className="mx -2">
                <TouchableOpacity onPress={() => { router.back() }}>
                    <IconSymbol name="back" />
                </TouchableOpacity>
            </View>
            <Text className='text-xl font-bold'>{title === null ? '' : title}</Text>
            <View>
            </View>
        </View>

        <DeviceNav feedId={+feedId} type={"light"} />
    </>);
}