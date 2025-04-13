import React from 'react';
import { useState, useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DeviceHeader from '@/components/device/DeviceHeader';
import { getStatisticService } from '@/services/statisticService';
import { runningTimeObjects } from '@/types/statistic.type';
import { useLoading } from '@/contexts/LoadingContext';
import Navigation from '@/components/Navigation';
import BarChartAnimated from '@/components/chart/BarChartAnimated';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function Statistic() {
  const feedId = useLocalSearchParams().id;
  const { setLoading } = useLoading();
  const [deviceData, setDeviceData] = useState<runningTimeObjects | null>(null);

  useEffect(() => {
    if (!feedId) return;
    setLoading(true);
    (async () => {
      try {
        const response = await getStatisticService(feedId as string);
        setDeviceData(response);
      } catch (error) {
        console.error("Error fetching device data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [feedId]);

  return (
    <View className="flex-1">
      <ScrollView>
        <DeviceHeader feedId={+feedId} title={deviceData ? `${deviceData.type} ${deviceData.title}` : null} />

        <View className='w-9/12 mt-4 mx-auto border border-black rounded-md p-1'>
          <View className='flex flex-row'>
            <View className='w-10/12 h-full items-baseline'>
              <Text className='text-lg color-black-200'>{deviceData?.startDate} - {deviceData?.endDate}</Text>
            </View>
            <View className='w-2/12 flex items-center justify-center'>
                <IconSymbol name="calendar" color="black" />
            </View>
          </View>
        </View>


        <BarChartAnimated barData={deviceData ? deviceData.data : []} />

      </ScrollView>

      <View className="absolute bottom-2 w-full">
        <Navigation current={2} />
      </View>
    </View>
  );
}
