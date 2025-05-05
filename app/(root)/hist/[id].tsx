import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Navigation from '@/components/Navigation';
import DeviceHeader from '@/components/device/DeviceHeader';
import TableHistory from '@/components/TableHistory';
import { getDeviceData } from '@/services/deviceService';
import { fetchHistory, getDeviceLogService } from '@/services/historyService';
import { deviceStatusObject } from '@/types/device.type';
import { useLoading } from '@/contexts/LoadingContext';
import { miniLogObject } from '@/types/log.type';
import dayjs from 'dayjs';

export default function History({ }) {
    const feedId = useLocalSearchParams().id;
    const { setLoading } = useLoading();
    const [tableData, setTableData] = useState<[string, string][] | null>([]);
    const [deviceData, setDeviceData] = useState<deviceStatusObject | null>(null);
    const [deviceLog, setDeviceLog] = useState<miniLogObject[] | null>(null);
    useEffect(() => {
        if (!feedId) return;
        setLoading(true);
        (async () => {
            try {
                const deviceDataResponse = await getDeviceData(feedId as string);
                setDeviceData(deviceDataResponse);
                console.log("Device data: ", deviceDataResponse);
                const deviceLogResponse = await getDeviceLogService(feedId as string);
                console.log(
                    "Device log: ", JSON.stringify(deviceLogResponse, null, 2) // pretty print
                )
                let HistData = deviceLogResponse
                    .map((item) => {
                        let action = "";
                    
                        // let time = new Date(item.createdAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
                        let time = dayjs.utc(item.createdAt).format('HH:mm:ss DD/MM/YYYY');
                        if (deviceDataResponse.type === "fan") {
                            if (item.type == "onoff") {
                                action = item.value == '0' ? "Tắt" : "Bật tốc độ " + item.value;
                                return [action, time];
                            }
                        }
                        else if (deviceDataResponse.type == "light") {
                            if (item.type == "onoff") {
                                action = item.value == "#000000" ? "Tắt" : "Bật màu " + item.value;
                                return [action, time];
                            }
                        }
                    }).filter(Boolean) as [string, string][];


                console.log("HistData: ", HistData);
                setTableData(HistData);
            } catch (error) {
                console.error("Error fetching device data:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, [feedId]);

    return (
        <View>
            <View className='w-11/12 mx-auto mt-1'>
                <DeviceHeader type={deviceData ? deviceData.type : "fan"} status={2} feedId={+feedId} title={deviceData ? `${deviceData.title}` : null} />
                <View className='h-5/6 mt-4'>
                    <TableHistory tableData={tableData} />
                </View>
            </View>
            <View className='h-20 bottom-0'>
                <Navigation current={2} />
            </View>
        </View>
    )
}