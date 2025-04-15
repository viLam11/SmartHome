import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';

export default function DeviceNav({current,  id = 1, type }) {
    const router = useRouter();
    const pathname = usePathname();
    const [status, setStatus] = useState(current);

    useEffect(() => {
        if (pathname.includes('/hist/')) setStatus(2);
        else if (pathname.includes('/stats/')) setStatus(3);
        else setStatus(1);
    }, [pathname]);
    function hanldeNav(index) {
        if (index == status) return;
        switch (index) {
            case 1:
                if (type == "light") router.replace(`/devices/lights/${id}`);
                if (type == "fan") router.replace(`/devices/fans/${id}`);
                if (type == "sensor") router.replace(`/devices/sensors/${id}`);
                if (type == "door") router.replace(`/devices/doors/${id}`);
                break;
            case 2:
                router.replace(`/hist/${id}`);
                break;
            case 3:
                router.replace(`/devices/stats/${id}`);
                break;
        }
    }   
    return (
        <View>
            <View className='flex flex-row  justify-between mt-2 mx-6'>
                <View className={`w-1/ p-1 rounded-lg ${status == 1? 'bg-enable' : 'bg-disale'}`}>
                    <TouchableOpacity onPress={() => hanldeNav(1)}>
                        <Text className={`text-center font-semibold ${status == 1 ? 'color-black' : 'color-slate-600'}`}>Cài đặt</Text>
                    </TouchableOpacity>
                </View>
                <View className={`w-1/ p-1 rounded-lg ${status == 2 ? 'bg-enable' : 'bg-disale'}`}>
                    <TouchableOpacity onPress={() => {hanldeNav(2)}} >
                        <Text className={`text-center font-semibold ${status == 2 ? 'color-black' : 'color-slate-600'}`}>Lịch sử</Text>
                    </TouchableOpacity>
                </View>
                <View className={`w-1/ p-1 rounded-lg ${status == 3 ? 'bg-enable' : 'bg-disale'}`}>
                    <TouchableOpacity onPress={() => {hanldeNav(3)}} >
                        <Text className={`text-center font-semibold ${status == 3 ? 'color-black' : 'color-slate-600'}`}>Thống kê</Text> 
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}