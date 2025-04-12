

import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Table, Row, TableWrapper } from "react-native-table-component";
import Navigation from '@/components/Navigation';
import DeviceNav from '@/components/DeviceNav';
import AsyncStorage from '@react-native-async-storage/async-storage'; import axios from 'axios';
import TableHistory from '@/components/TableHistory';
const base_url = 'https://nearby-colleen-quanghia-3bfec3a0.koyeb.app/api/v1';

const renderCell = (data, index) => {
    if (index === 3) {
        return (
            <TouchableOpacity onPress={() => alert("Xóa hàng này")}>
                <Text style={{ color: "red", textAlign: "center" }}>Xóa</Text>
            </TouchableOpacity>
        );
    }
    return <Text style={{ textAlign: "center" }}>{data}</Text>;
};


export default function History({ }) {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [deviceData, setDeviceData] = useState(null);
    const [deviceLog, setDeviceLog] = useState(null);   
    const [allData, setAllData] = useState([]);
    const [tableData, setTableData] = useState([[]]);
    const tableHead = ["Hoạt động", "Thời gian", "Người tạo"];

    useEffect(() => {
        console.log("id", id);
        const fetchDeviceData = axios.get(`${base_url}/devices/3014275`)
        const fetchDeviceLog = axios.get(`${base_url}/devices/3014275/logs`)
        Promise.all([fetchDeviceData, fetchDeviceLog])
            .then((response) => {
                const [deviceResponse, logResponse] = response;
                setDeviceData(deviceResponse.data);
                setDeviceLog(logResponse.data);
                console.log(deviceResponse.data);
                console.log(logResponse.data); 
                let deviceType = deviceResponse.data.type;
                let HistData = logResponse.data.map((item) => {
                    let action = ""
                    let time = new Date(item.createdAt).toLocaleString('vi-VN', {timeZone: 'Asia/Ho_Chi_Minh'});   
                    if (deviceType === "fan") {
                        if (item.type == "onoff") {
                            action = item.value == 0 ? "Tắt" : "Bật tốc độ " + item.value;
                            return [action, time]
                        }
                    } 
                    else if (deviceType == "light") {
                        if (item.type == "onoff") { 
                            action = item.value == "#000000" ? "Tắt" : "Bật màu " + item.value;
                            return [action, time]
                        }
                    }
                }).filter(Boolean);
                console.log("HistData", HistData);  
                setTableData(HistData);
            })
            .catch((error) => {
                console.error(error);
            });    
    }, [id])

    return (
        <View>
            <View className='w-11/12 mx-auto mt-1'>
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

                <DeviceNav status={2} id={+id} type={"light"} />

                <View className='h-5/6 mt-4 mb-2'>
                    <TableHistory tableData={tableData} />
                </View>
            </View>
            <View className='h-20 bottom-0'>
                <Navigation />
            </View>
        </View>

    )
}


