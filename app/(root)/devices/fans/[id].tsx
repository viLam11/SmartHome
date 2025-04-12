import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import DeviceHeader from '@/components/device/DeviceHeader';
import Navigation from '@/components/Navigation';
import SpinningFan from '@/components/SpinningFan';
import DeviceTimerTable from '@/components/device/DeviceTimerTable';

import images from '@/constants/images';
import { getDeviceData, fanSpeedService } from '@/services/deviceService';
import { deviceStatusObject } from '@/types/device.type';

import { useLoading } from '@/contexts/LoadingContext';

export default function Fan() {
  const feedId = useLocalSearchParams().id;
  const [speed, setSpeed] = useState(0);
  const [status, setStatus] = useState(false);
  const [statusAuto, setSatusAuto] = useState(false);
  const [deviceData, setDeviceData] = useState<deviceStatusObject | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchCurrentStatus = async () => {
      setLoading(true);
      try {
        const response = await getDeviceData(feedId as string);
        setDeviceData(response);
        const level = response?.value;
        const levelSpeedMap = [0, 150, 100, 25];
        setSpeed(levelSpeedMap[+level] || 0);
        setStatus(+level > 0);
      } catch (error) {
        console.error("Error fetching device data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentStatus();
  }, [feedId]);

  async function handleFanSpeed(level: number) {
    if (!status && level === 0) return;
    try {
      await fanSpeedService(feedId as string, level);
      const levelSpeedMap = [0, 150, 100, 25];
      setSpeed(levelSpeedMap[level]);
      setStatus(!!level);
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="min-h-screen flex flex-col m-2">
      <DeviceHeader feedId={+feedId} title={deviceData ? `${deviceData.type} ${deviceData.title}` : null} />

      <View className="flex flex-row mt-10">
        <View className="w-1/2">
          <SpinningFan speed={speed} />
          <View className="flex flex-row items-center justify-center">
            {[1, 2, 3].map((lvl, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => handleFanSpeed(lvl)}
                className={`w-6 h-6 mx-1 rounded-full ${speed === [150, 100, 25][i] ? 'bg-yellow' : 'bg-gray-500'} flex items-center justify-center`}
              >
                <Text className="text-white">{lvl}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="w-1/2 flex flex-col items-end px-4">
          <View className="flex flex-row">
            <Text className="px-2 w-20 font-semibold">{status ? 'Bật' : 'Tắt'}</Text>
            <TouchableOpacity onPress={() => handleFanSpeed(status ? 0 : 1)}>
              <Image source={status ? images.auto_on : images.auto_off} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className="mx-2 mt-4">
        <View className="flex flex-row">
          <View className="w-40">
            <Text className="px-2 w-40 font-semibold">Tự động: </Text>
          </View>
          <TouchableOpacity onPress={() => setSatusAuto(!statusAuto)}>
            <Image source={statusAuto ? images.auto_on : images.auto_off} />
          </TouchableOpacity>
        </View>
        <DeviceTimerTable />
      </View>

      <View className="flex-grow" />
      <View className="h-32">
        <View className="bottom-8 w-full">
          <Navigation current={2} />
        </View>
      </View>
    </ScrollView>
  );
}
