import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import images from '@/constants/images';
import { useState, useEffect } from 'react';
import { Table, Row } from "react-native-table-component";
import DeviceNav from '@/components/DeviceNav';
import Navigation from '@/components/Navigation';
import SpinningFan from '@/components/SpinningFan';
import axios from 'axios';
const base_url = 'https://nearby-colleen-quanghia-3bfec3a0.koyeb.app/api/v1';

const renderCell = (data: string, index: number) => {
    if (index === 3) {
        // Nếu là cột "Edit", thêm button
        return (
            <TouchableOpacity onPress={() => alert("Xóa hàng này")}>
                <Text style={{ color: "red", textAlign: "center" }}>Xóa</Text>
            </TouchableOpacity>
        );
    }
    return <Text>{data}</Text>;
};




export default function Fan() {
    const router = useRouter();
    const { feedId } = useLocalSearchParams();
    const [color, setColor] = useState("white");
    const [speed, setSpeed] = useState(0);
    const [status, setStatus] = useState(false);
    const [statusAuto, setSatusAuto] = useState(false);  
    const [fanData, setFanData] = useState(null);

    const tableHead = ["Start", "End", "Brightness", "Edit"];
    const tableData = [
        ["17:00", "16:00", "nhẹ", ".."],
        ["20:00", "21:00", "nhẹ", ".."]
    ];

    useEffect(() => {
        const fetchCurrentStatus = async () => {
            console.log("## Feed ID: ", feedId);
            const response = await axios.get(`${base_url}/devices/${feedId}`);
            setFanData(response.data)
            const fanTemp = response.data;
            if (fanTemp.value == 1) {
                setSpeed(150);
                setStatus(true);
            } else if (fanTemp.value == 2) {
                setSpeed(100);
                setStatus(true);
            } else if (fanTemp.value == 3) {
                setSpeed(25);
                setStatus(true);
            }
        }
        fetchCurrentStatus();
    }, [feedId]);

    async function handleFanSpeed( id: string | string[], level: number) {
        if(!status) return;

        try {
            const respone = await axios.post(`${base_url}/devices/${id}`, { value: level.toString() }, {
                headers: {
                    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVkQXQiOjE3NDM0ODI5OTQsInVzZXJJRCI6IjEifQ.9Gt8rqLKmePlnbc2MpkCofnGSK_gmf0WqoXlNuv75EE"
                }
            });

            if (level == 1) {
                setSpeed(150);
                setStatus(true);
            } else if (level == 2) {
                setSpeed(100);
                setStatus(true);
            } else if (level == 3) {
                setSpeed(25);
                setStatus(true);
            } else if (level == 0) {
                setSpeed(0);
                setStatus(false);
            }
        } catch(e) {
            console.log("Error: ", e);
        }   
    }


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className='min-h-screen flex flex-col m-2'>
            <View className='flex flex-row justify-between'>
                <View className="mx -2">
                    <TouchableOpacity onPress={() => { router.back() }}>
                        <IconSymbol name="back" color="black" />
                    </TouchableOpacity>
                </View>
                <Text className='text-xl font-bold'>QUẠT {+feedId}</Text>
                <View>
                </View>
            </View>
            <DeviceNav status={1} feedId={+feedId} type={"fan"} />

            <View className="flex flex-row mt-10">
                <View className='w-1/2'>
                    <SpinningFan speed={speed} />
                    <View className="flex flex-row items-center justify-center ">
                        <TouchableOpacity onPress={() => handleFanSpeed(feedId, 1)} className={`w-6 h-6 mx-1 rounded-full ${speed == 150 ? "bg-yellow" : "bg-gray-500"}  flex items-center justify-center`}>
                            <Text className="text-white">1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleFanSpeed(feedId, 2)} className={`w-6 h-6 mx-1 rounded-full ${speed == 100 ? "bg-yellow" : "bg-gray-500"}  flex items-center justify-center`}>
                            <Text className="text-white">2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleFanSpeed(feedId, 3)} className={`w-6 h-6 mx-1 rounded-full ${speed == 25 ? "bg-yellow" : "bg-gray-500"}  flex items-center justify-center`}>
                            <Text className="text-white">3</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className='w-1/2 flex flex-col items-end px-4 '>
                    <View className=' flex flex-row'>
                        {status ? <Text className="px-2 w-20 font-semibold">Bật</Text> : <Text className="px-2 w-20 font-semibold">Tắt</Text>}
                        <TouchableOpacity onPress={() => { if (status) { handleFanSpeed(feedId, 0) } else { setStatus(true),handleFanSpeed(feedId, 1) } }}>
                            <Image source={status ? images.auto_on : images.auto_off} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>



            <View className='mx-2 mt-4'>
                <View className="flex flex-row">
                    <View className='w-40'>
                        <Text className="px-2 w-40 font-semibold">Tự động:     </Text>
                    </View>
                    <TouchableOpacity onPress={() => setSatusAuto(!statusAuto)}>
                        <Image source={statusAuto ? images.auto_on : images.auto_off} />
                    </TouchableOpacity>
                </View>

                <View>
                    <View className='flex flex-row justify-between'>
                        <Text className='font-semibold mt-4'>Hẹn giờ</Text>
                        <TouchableOpacity onPress={() => alert("Thêm hẹn giờ")}>
                            <View className='bg-black rounded-full'>
                                <IconSymbol name="add" color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className='mt-2'>
                        <View style={{ borderWidth: 1, borderColor: "black", borderRadius: 10, overflow: "hidden" }}>
                            <Table borderStyle={{ borderWidth: 0 }}>
                                {/* Header */}
                                <Row
                                    data={tableHead}
                                    style={{
                                        height: 40,
                                        backgroundColor: "#FFD700",
                                        borderBottomWidth: 1,
                                        borderColor: "black",
                                    }}
                                    textStyle={{ textAlign: "center", fontWeight: "bold" }}
                                />
                                {/* Body */}
                                {tableData.map((rowData, rowIndex) => (
                                    <Row
                                        key={rowIndex}
                                        data={rowData.map((cell, cellIndex) => renderCell(cell, cellIndex))}
                                        style={{ height: 30 }}
                                        textStyle={{ textAlign: "center" }}
                                    />
                                ))}
                            </Table>
                        </View>
                    </View>
                </View>

                <View className='h-10'></View>
            </View>


            <View className="flex-grow"></View>
            <View className="h-32">
                <View className=" bottom-8 w-full">
                    <Navigation current={2} />
                </View>
            </View>
        </ScrollView>
    )
}

