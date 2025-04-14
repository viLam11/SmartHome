import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

type DeviceType = "light" | "fan" | "sensor" | "door";

// interface DeviceNavProps {
//     propps.status?: number;
//     id?: number;
//     feedId?: number;
//     type: DeviceType;
// }

<<<<<<<< HEAD:components/device/DeviceNav.tsx
export default function DeviceNav({ feedId = 1, type }: DeviceNavProps) {
========
export default function DeviceNav(props: {status: number, id: number, type: DeviceType }) {
>>>>>>>> master:components/DeviceNav.tsx
    const router = useRouter();
    const pathname = usePathname();
    const [status, setStatus] = useState(1);

    useEffect(() => {
        if (pathname.includes('/hist/')) setStatus(2);
        else if (pathname.includes('/stats/')) setStatus(3);
        else setStatus(1);
    }, [pathname]);
    function hanldeNav(index: number) {
        if (index == props.status) return;
        switch (index) {
            case 1:
<<<<<<<< HEAD:components/device/DeviceNav.tsx
                if (type == "light") router.replace(`/devices/lights/${feedId}`);
                if (type == "fan") router.replace(`/devices/fans/${feedId}`);
                if (type == "sensor") router.replace(`/devices/sensors/${feedId}`);
                // if (type == "door") router.replace(`/devices/doors/${feedId}`);
========
                if (props.type == "light") router.replace(`/devices/lights/${props.id}`);
                if (props.type == "fan") router.replace(`/devices/fans/${props.id}`);
                if (props.type == "sensor") router.replace(`/devices/sensors/${props.id}`);
>>>>>>>> master:components/DeviceNav.tsx
                break;
            case 2:
                router.replace(`/hist/${props.id}`);
                break;
            case 3:
                router.replace(`/devices/stats/${props.id}`);
                break;
        }
    }   
    return (
        <View>
            <View className='flex flex-row  justify-between mt-2 mx-6'>
                <View className={`w-1/ p-1 rounded-lg ${props.status == 1? 'bg-enable' : 'bg-disale'}`}>
                    <TouchableOpacity onPress={() => hanldeNav(1)}>
                        <Text className={`text-center font-semibold ${props.status == 1 ? 'color-black' : 'color-slate-600'}`}>Cài đặt</Text>
                    </TouchableOpacity>
                </View>
                <View className={`w-1/ p-1 rounded-lg ${props.status == 2 ? 'bg-enable' : 'bg-disale'}`}>
                    <TouchableOpacity onPress={() => {hanldeNav(2)}} >
                        <Text className={`text-center font-semibold ${props.status == 2 ? 'color-black' : 'color-slate-600'}`}>Lịch sử</Text>
                    </TouchableOpacity>
                </View>
                <View className={`w-1/ p-1 rounded-lg ${props.status == 3 ? 'bg-enable' : 'bg-disale'}`}>
                    <TouchableOpacity onPress={() => {hanldeNav(3)}} >
                        <Text className={`text-center font-semibold ${props.status == 3 ? 'color-black' : 'color-slate-600'}`}>Thống kê</Text> 
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}